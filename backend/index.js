import express from "express";
import cors from "cors";
import latexRoutes from "./routes/latex.js";

const app = express();

// middleware to parse JSON
app.use(express.json());

//enable cors for all routes
app.use(cors());

// API route
app.use("/api/latex", latexRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));