import { useState } from 'react'
import './App.css';
import PersonalInfo from './components/input-sections/PersonalInfo';
import Education from './components/input-sections/Education';
import Experience from './components/input-sections/Experience';
import Projects from './components/input-sections/Projects';
import Skills from './components/input-sections/Skills';
import PdfViewer from './components/preview-section/PdfViewer';
import OverleafButton from './components/preview-section/OverleafButton';
import Header from './components/header/Header';

function App() {
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "", phone: "", linkedin: "", github: ""});
  const [education, setEducation] = useState([{school: "", location: "", degree: "", startDate: "", endDate: "", gpa: ""}]);
  const [experience, setExperience] = useState([{company: "", location: "", position: "", startDate: "", endDate: "", description: ""}]);
  const [projects, setProjects] = useState([{title: "", tools: "", startDate: "", endDate: "", link: "", description: ""}]);
  const [skills, setSkills] = useState({languages: "", frameworks: "", tools: ""});
  const [latexCode, setLatexCode] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  function escapeLatex(str = "") {
  return str
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/\^/g, "\\^{}")
    .replace(/~/g, "\\~{}");
  }

  const generateLatex = () => {
    return String.raw`
\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\titleformat{\section}{\vspace{-4pt}\scshape\raggedright\large}{}{0em}{}[\color{black}\titlerule\vspace{-5pt}]
\pdfgentounicode=1

% Custom commands
\newcommand{\resumeItem}[1]{\item \small #1 \vspace{-2pt}}
\newcommand{\resumeSubheading}[4]{%
  \vspace{-2pt}\item
  \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
    \textbf{#1} & #2 \\
    \textit{\small #3} & \textit{\small #4} \\
  \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeProjectHeading}[2]{%
  \item
  \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
    \small #1 & #2 \\
  \end{tabular*}\vspace{-7pt}
}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

\begin{document}

\begin{center}
\textbf{\Huge \scshape ${escapeLatex(personalInfo.name)}} \\ 
\vspace{1pt}
\small ${escapeLatex(personalInfo.phone)} $|$ 
\href{mailto:${escapeLatex(personalInfo.email)}}{\underline{${escapeLatex(personalInfo.email)}}} $|$ 
\href{${escapeLatex(personalInfo.linkedin)}}{\underline{${escapeLatex(personalInfo.linkedin)}}} $|$ 
\href{${escapeLatex(personalInfo.github)}}{\underline{${escapeLatex(personalInfo.github)}}}
\end{center}

\section{Education}
\resumeSubHeadingListStart
${education
  .map((entry) => {
    const gpaPart = entry.gpa !== '' ? ` \\quad GPA: ${escapeLatex(entry.gpa)}` : '';
    return String.raw`\resumeSubheading
  {${escapeLatex(entry.school)}}{${escapeLatex(entry.location)}}
  {${escapeLatex(entry.degree)}${gpaPart}}{${escapeLatex(entry.startDate)} -- ${escapeLatex(entry.endDate)}}`;
  })
  .join('\n')}
\resumeSubHeadingListEnd

\section{Experience}
\resumeSubHeadingListStart
${experience
  .map((entry) => {
    const header = String.raw`\resumeSubheading
  {${escapeLatex(entry.company)}}{${escapeLatex(entry.startDate)} -- ${escapeLatex(entry.endDate)}}
  {${escapeLatex(entry.position)}}{${escapeLatex(entry.location)}}`;

    const descriptionBlock =
      entry.description && entry.description.trim() !== ''
        ? String.raw`
  \resumeItemListStart
    ${entry.description
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => `\\resumeItem{${escapeLatex(line.trim())}}`)
      .join('\n')}
  \resumeItemListEnd`
        : '';

    return header + descriptionBlock;
  })
  .join('\n')}
\resumeSubHeadingListEnd

\section{Projects}
\resumeSubHeadingListStart
${projects
  .map((entry) => {
    const projectHeader = String.raw`\resumeProjectHeading
  {\textbf{${escapeLatex(entry.title)}} $|$ \emph{${escapeLatex(entry.tools)}}}{${escapeLatex(entry.startDate)} -- ${escapeLatex(entry.endDate)}}`;

    const projectDescription = entry.description && entry.description.trim() !== ''
      ? String.raw`\resumeItemListStart
      ${entry.description
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => `\\resumeItem{${escapeLatex(line.trim())}}`)
        .join('\n')}
    \resumeItemListEnd
    ${entry.link && entry.link.trim() !== '' ? `\\vspace{-4pt}\n  \\href{${escapeLatex(entry.link)}}{\\underline{${escapeLatex(entry.link)}}}` : ''}`
      : '';

    return projectHeader + projectDescription;
  })
  .join('\n')}
\resumeSubHeadingListEnd

\section{Technical Skills}
\begin{itemize}[leftmargin=0.15in, label={}]
\small{
  \item{
    \textbf{Languages}: ${escapeLatex(skills.languages)} \\
    \textbf{Frameworks}: ${escapeLatex(skills.frameworks)} \\
    \textbf{Developer Tools}: ${escapeLatex(skills.tools)} \\
  }
}
\end{itemize}

\end{document}
  `;
  } 

  const handleGenerate = async () => {
    const latex = generateLatex();
    setLatexCode(latex);

    try {
    // wake backend first
      let awake = false;
      while (!awake) {
        try {
          const healthRes = await fetch(`${import.meta.env.VITE_API_URL}/api/health`);
          if (healthRes.ok) {
            awake = true;
          } else {
            console.log("Backend still waking up...");
            await new Promise(r => setTimeout(r, 3000)); // wait 3s before retry
          }
        } catch {
          console.log("Backend unreachable, retrying...");
          await new Promise(r => setTimeout(r, 3000));
        }
      }

      // once backend awake compile LaTeX
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/latex/compile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latex }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return alert("Failed to compile LaTeX: " + error.error);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Something went wrong while generating your PDF.");
    }
  }

  return (
    <>
      <Header/>
      <div className="app-container">
        <div className="inputs-container">
          <PersonalInfo data={personalInfo} setData={setPersonalInfo} />
          <Education data={education} setData={setEducation} />
          <Experience data={experience} setData={setExperience} />
          <Projects data={projects} setData={setProjects}/>
          <Skills data={skills} setData={setSkills}/>
        </div>

        <div className="preview-container">
          <div className="buttons-container">
            <button className="generate-button" onClick={handleGenerate}>Generate</button>
            <OverleafButton/>
          </div>
          
          <PdfViewer pdfUrl={pdfUrl} />
        </div>
      </div>
    </>
  )
}

export default App
