import { useState } from 'react'
import './App.css';
import PersonalInfo from './components/PersonalInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';

function App() {
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "", phone: "", linkedin: "", github: ""});
  const [education, setEducation] = useState([{school: "", location: "", degree: "", startDate: "", endDate: "", gpa: ""}]);
  const [experience, setExperience] = useState([{company: "", location: "", position: "", startDate: "", endDate: "", description: ""}]);
  const [projects, setProjects] = useState([{title: "", tools: "", startDate: "", endDate: "", link: "", description: ""}]);
  const [skills, setSkills] = useState({languages: "", frameworks: "", tools: ""});
  const [latexCode, setLatexCode] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

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
    \input{glyphtounicode}

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

    \titleformat{\section}{
      \vspace{-4pt}\scshape\raggedright\large
    }{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

    \pdfgentounicode=1

    % Custom commands
    \newcommand{\resumeItem}[1]{\item\small{{#1 \vspace{-2pt}}}}
    \newcommand{\resumeSubheading}[4]{
      \vspace{-2pt}\item
        \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
          \textbf{#1} & #2 \\
          \textit{\small#3} & \textit{\small #4} \\
        \end{tabular*}\vspace{-7pt}
    }
    \newcommand{\resumeSubSubheading}[2]{
        \item
        \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
          \textit{\small#1} & \textit{\small #2} \\
        \end{tabular*}\vspace{-7pt}
    }
    \newcommand{\resumeProjectHeading}[2]{
        \item
        \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
          \small#1 & #2 \\
        \end{tabular*}\vspace{-7pt}
    }
    \newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}
    \renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
    \newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
    \newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
    \newcommand{\resumeItemListStart}{\begin{itemize}}
    \newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

    \begin{document}

    \begin{center}
        \textbf{\Huge \scshape ${personalInfo.name}} \\ \vspace{1pt}
        \small ${personalInfo.phone} $|$ \href{mailto:x@x.com}{\underline{${personalInfo.email}}} $|$ 
        \href{https://linkedin.com/in/...}{\underline{${personalInfo.linkedin}}} $|$
        \href{https://github.com/...}{\underline{${personalInfo.github}}}
    \end{center}

    \section{Education}
      \resumeSubHeadingListStart
        ${education.map((entry) => String.raw`
          \resumeSubheading
          {${entry.school}}{${entry.location}}
          {${entry.degree} \quad GPA: ${entry.gpa}}{${entry.startDate} -- ${entry.endDate}}
          `
        )}
      \resumeSubHeadingListEnd

    \section{Experience}
      \resumeSubHeadingListStart
        ${experience.map((entry) => String.raw`
          \resumeSubheading
            {${entry.company}}{${entry.startDate} -- ${entry.endDate}}
            {${entry.position}}{${entry.location}}
            \resumeItemListStart
              ${entry.description
                  .split("\n")
                  .filter(line => line.trim() !== "")
                  .map(line => `\\resumeItem{${line.trim()}}`)
                  .join("\n")
              }
            \resumeItemListEnd
          `
        )}
      \resumeSubHeadingListEnd

    \section{Projects}
      \resumeSubHeadingListStart
        ${projects.map((entry) => String.raw`
          \resumeProjectHeading
            {\textbf{${entry.title}} $|$ \emph{${entry.tools}}}{${entry.startDate} -- ${entry.endDate}}
            \resumeItemListStart
              ${entry.description
                  .split("\n")
                  .filter(line => line.trim() !== "")
                  .map(line => `\\resumeItem{${line.trim()}}`)
                  .join("\n")
              }
            \resumeItemListEnd
            ${entry.link !== ""
              ? `\\vspace{-4pt}
                \\href{${entry.link}}{\\underline{${entry.link}}}`
            : ""}
          `
        )}
      \resumeSubHeadingListEnd

        \section{Technical Skills}
        \begin{itemize}[leftmargin=0.15in, label={}]
          \small{
            \item{
              \textbf{Languages}{: ${skills.languages}} \\
              \textbf{Frameworks}{: ${skills.frameworks}} \\
              \textbf{Developer Tools}{: ${skills.tools}} \\
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
      const response = await fetch("http://localhost:5000/api/latex/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latex })
      });

      if(!response.ok){
        const error = await response.json();
        console.error(error);
        return alert("Failed to compile LaTeX: ", error.error);
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }

  return (
    <div className="app-container">
      <div className="inputs-container">
        <PersonalInfo data={personalInfo} setData={setPersonalInfo} />
        <Education data={education} setData={setEducation} />
        <Experience data={experience} setData={setExperience} />
        <Projects data={projects} setData={setProjects}/>
        <Skills data={skills} setData={setSkills}/>
      </div>

      <div className="preview-container">
        <button onClick={handleGenerate}>Generate</button>

        {pdfUrl && (
          <iframe src={pdfUrl} title="PDF Viewer"></iframe>
        )}
      </div>
    </div>
  )
}

export default App
