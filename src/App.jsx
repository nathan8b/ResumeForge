import { useState } from 'react'
import './styles/App.css'
import PersonalInfo from './components/PersonalInfo'

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Smith", 
    email: "johnsmith@gmail.com",
    phone: "1001001000",
    location: "New Jersey, USA"  
  });
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  return (
    <>
      <div className="inputs-container">
        <PersonalInfo data={personalInfo} setData={setPersonalInfo} />
        {/* <Education data={education} setData={setEducation} /> */}
        {/* <Experience data={experience} setData={setExperience} /> */}
      </div>

      <div className="preview-container">

      </div>
    </>
  )
}

export default App
