import { useState } from 'react'
import './App.css';
import PersonalInfo from './components/PersonalInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';

function App() {
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "", phone: "", location: ""});
  const [education, setEducation] = useState([{school: "", degree: "", startDate: "", endDate: "", gpa: ""}]);
  const [experience, setExperience] = useState([{company: "", position: "", startDate: "", EndDate: "", description: ""}]);
  const [projects, setProjects] = useState([{title: "", tools: "", startDate: "", endDate: "", link: "", description: ""}]);

  return (
    <>
      <div className="inputs-container">
        <PersonalInfo data={personalInfo} setData={setPersonalInfo} />
        <Education data={education} setData={setEducation} />
        <Experience data={experience} setData={setExperience} />
        <Projects data={projects} setData={setProjects}/>
      </div>

      <div className="preview-container">

      </div>
    </>
  )
}

export default App
