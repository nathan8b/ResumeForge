import { useState } from 'react'
import './App.css';
import PersonalInfo from './components/PersonalInfo';
import Education from './components/Education';

function App() {
  const [personalInfo, setPersonalInfo] = useState({ name: "", email: "", phone: "", location: ""});
  const [education, setEducation] = useState([{school: "", degree: "", startDate: "", endDate: "", gpa: ""}]);
  const [experience, setExperience] = useState([]);

  return (
    <>
      <div className="inputs-container">
        <PersonalInfo data={personalInfo} setData={setPersonalInfo} />
        <Education data={education} setData={setEducation} />
        {/* <Experience data={experience} setData={setExperience} /> */}
      </div>

      <div className="preview-container">

      </div>
    </>
  )
}

export default App
