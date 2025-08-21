import { useState } from 'react'
import './styles/App.css'

function App() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  return (
    <>
      <div className="inputs-container">

      </div>
      <div className="preview-container">

      </div>
    </>
  )
}

export default App
