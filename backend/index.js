import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const app = express();

// middleware to parse JSON
app.use(express.json());

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",           // Vite dev
  "https://refinedresume.netlify.app/" // Netlify frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Controller
const compileLatex = async (req, res) => {
  const { latex } = req.body;

  if (!latex) {
    return res.status(400).json({ error: "No LaTeX provided" });
  }

  const tmpDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  const texPath = path.join(tmpDir, "document.tex");
  const pdfPath = path.join(tmpDir, "document.pdf");

  try {
    fs.writeFileSync(texPath, latex);

    exec(
      `pdflatex -interaction=nonstopmode -output-directory=${tmpDir} ${texPath}`,
      (err, stdout, stderr) => {
        console.log("STDOUT:", stdout);
        console.error("STDERR:", stderr);

        if (err) {
          console.error("pdflatex failed:", err);
          return res.status(500).json({ error: "Failed to compile LaTeX" });
        }

        if (!fs.existsSync(pdfPath)) {
          console.error("PDF not found at", pdfPath);
          return res.status(500).json({ error: "PDF was not generated" });
        }

        const stream = fs.createReadStream(pdfPath);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=document.pdf");
        stream.pipe(res);

        stream.on("error", (streamErr) => {
          console.error("Streaming error:", streamErr);
          res.status(500).json({ error: "Failed to stream PDF" });
        });
      }
    );
  } catch (writeErr) {
    console.error("Error writing .tex file:", writeErr);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route
app.post("/api/latex/compile", compileLatex);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));