import express from "express";
import { compileLatex } from "../controllers/latexController.js";
console.log("compileLatex in routes:", compileLatex);

const router = express.Router();

// POST /api/latex/compile
router.post("/compile", compileLatex);

export default router;