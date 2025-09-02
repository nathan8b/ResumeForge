import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const compileLatex = async (req, res) => {
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

    exec(`pdflatex -interaction=nonstopmode -output-directory=${tmpDir} ${texPath}`, (err, stdout, stderr) => {
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

      try {
        const stream = fs.createReadStream(pdfPath);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=document.pdf");
        stream.pipe(res);

        stream.on("error", (streamErr) => {
          console.error("Streaming error:", streamErr);
          res.status(500).json({ error: "Failed to stream PDF" });
        });
      } catch (streamCatch) {
        console.error("Stream failed:", streamCatch);
        res.status(500).json({ error: "Failed to send PDF" });
      }
    });
  } catch (writeErr) {
    console.error("Error writing .tex file:", writeErr);
    res.status(500).json({ error: "Internal server error" });
  }
};
