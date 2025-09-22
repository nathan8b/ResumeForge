# 🔥 Resume Forge
Live Link: https://latex-resume-forge.netlify.app/ 

> A full-stack web app to generate resumes from LaTeX, preview them instantly, and export as PDF or open in Overleaf

![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb?style=flat-square)
![Node](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✨ Features

- 🖋️ Type your info into the inputs  
- ⚡ Compile LaTeX into a polished resume instantly  
- 📄 Download resumes as **PDFs**, or open in Overleaf for more freedom 
- 🌐 Deployable to free hosting platforms (Render, Vercel, etc.)  

---

## 🚀 Quick Start (local)

### Prerequisites
- **Node.js** (v18+ recommended)  
- **LaTeX toolchain** (`pdflatex`)  
- **Poppler utils** (`pdftoppm`) for PDF → image conversion  

On Debian/Ubuntu:
```bash
sudo apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended poppler-utils

# Backend Setup
cd backend
npm install

# Frontend Setup
cd frontend
npm install

# In root directory
npm run dev
```

## 🔧 Configuration
Frontend expects an .env file:

```bash
VITE_API_URL=http://localhost:5000
```

## 📜 License
MIT License © 2025 Nathan B.

🔥 Built with React, Express, and LaTeX — resumes forged in fire.

