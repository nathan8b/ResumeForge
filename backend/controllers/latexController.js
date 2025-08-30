import { response } from "express";
import fetch from "node-fetch";

export const compileLatex = async (req, res) => {
    const { latex } = req.body;

    if(!latex) {
        return res.status(400).json({ error: "No LaTeX provided" });
    }

    try {
        // send LaTeX to YtoTech API
        const response = await fetch("https://latex.ytotech.com/builds/sync", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                compiler: 'pdflatex',
                resources : [
                    {
                        main: true,
                        content: latex,
                    },
                ],
            }),
        });

        if(!response.ok) {
            const text = await response.text();
            return res.status(500).json({ error: 'Compilation failed', details: text})
        }

        const pdfBuffer = await response.arrayBuffer();

        // headers for PDF response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="output.pdf"');
        res.send(Buffer.from(pdfBuffer));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to compile LaTeX', details: error.message });
    }
}