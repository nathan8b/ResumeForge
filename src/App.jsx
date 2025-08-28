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

      </div>
    </>
  )
}

export default App
