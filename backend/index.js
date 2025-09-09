import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const app = express();

// middleware to parse JSON
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: "*", // allow any frontend
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// LaTeX Controller
const compileLatex = (req, res) => {
  const { latex } = req.body;
  if (!latex) return res.status(400).json({ error: "No LaTeX provided" });

  const tmpDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  const texPath = path.join(tmpDir, "document.tex");
  const pdfPath = path.join(tmpDir, "document.pdf");

  fs.writeFileSync(texPath, latex);

  exec(`pdflatex -interaction=nonstopmode -output-directory=${tmpDir} ${texPath}`, (err) => {
    if (err || !fs.existsSync(pdfPath)) {
      return res.status(500).json({ error: "Failed to compile LaTeX" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=document.pdf");
    fs.createReadStream(pdfPath).pipe(res);
  });
};

// Routes
app.post("/api/latex/compile", compileLatex);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// route to serve generated latex source
app.get("/api/latex/source", (req, res) => {
  const texPath = path.join(process.cwd(), "tmp", "document.tex");

  if (!fs.existsSync(texPath)) {
    res.status(404).send("No LaTeX source found");
    return;
  }

  res.setHeader("Content-Type", "application/x-tex; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=resume.tex");
  res.sendFile(texPath);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));