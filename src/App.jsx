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
  const [experience, setExperience] = useState([{company: "", location: "", position: "", startDate: "", EndDate: "", description: ""}]);
  const [projects, setProjects] = useState([{title: "", tools: "", startDate: "", endDate: "", link: "", description: ""}]);
  const [skills, setSkills] = useState({languages: "", frameworks: "", tools: ""});

  const generateLatex = () => String.raw`
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
              \resumeItem{${entry.description}}
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
              \resumeItem{${entry.description}}
            \resumeItemListEnd
            \vspace{-4pt}
            \href{${entry.link}}{\underline}
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
    `

  return (
    <>
      <div className="inputs-container">
        <PersonalInfo data={personalInfo} setData={setPersonalInfo} />
        <Education data={education} setData={setEducation} />
        <Experience data={experience} setData={setExperience} />
        <Projects data={projects} setData={setProjects}/>
        <Skills data={skills} setData={setSkills}/>
      </div>

      <div className="preview-container">
        <p style={{ whiteSpace: "pre-wrap"}}>{generateLatex()}/</p>
      </div>
    </>
  )
}

export default App
