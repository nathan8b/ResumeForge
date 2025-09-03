import express from "express";
import cors from "cors";
import latexRoutes from "./routes/latex.js";
console.log("latexRoutes in index:", latexRoutes);

const app = express();

// middleware to parse JSON
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "https://cv-app-o0sh.onrender.com" // Render frontend
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

app.options("*", cors());

// API route
app.use("/api/latex", latexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));