import { useState } from "react";

function Education({data, setData}) {
    const [open, setOpen] = useState(false);
    
    const handleChange = (index, field, value) => {
        const newEducation = [...data];
        newEducation[index][field] = value;
        setData(newEducation);
    }

    const addEducation = () => {
        setData([...data, {school: "", location: "", degree: "", startDate: "", endDate: "", gpa: ""}]);
    }

    const removeEducation = (index) => {
        const newEducation = data.filter((_, i) => i !== index);
        setData(newEducation);
    }

    return (
        <div className="section">
            <h2
                className="section-header"
                onClick={() => setOpen(!open)}
            >
                <span>Education</span>
                <span>{open ? "▲" : "▼"}</span>
            </h2>

            {open && (
                <div className="section-content">
                    {data.map((entry, index) => (
                        <div key={index} className="sub-section">

                            <div className="entry-header">
                                <h3 className="sub-title">School #{index+1}</h3>
                                {data.length > 1 && (
                                    <button className="delete-button" onClick={() => removeEducation(index)}>Delete</button>
                                )}
                            </div>
                            
                            <label htmlFor="school">School:</label>
                            <input 
                                type="text"
                                placeholder="Enter school name..."
                                value={entry.school}
                                onChange={(event) => handleChange(index, "school", event.target.value)}
                            />
                            <label htmlFor="location">Location:</label>
                            <input 
                                type="text"
                                placeholder="Ex: Athens, OH..."
                                value={entry.location}
                                onChange={(event) => handleChange(index, "location", event.target.value)}
                            />
                            <label htmlFor="degree">Degree:</label>
                            <input 
                                type="text"
                                placeholder="Enter degree..."
                                value={entry.degree}
                                onChange={(event) => handleChange(index, "degree", event.target.value)}
                            />
                            <label htmlFor="gpa">GPA (optional):</label>
                            <input 
                                type="number"
                                placeholder="Enter GPA..."
                                value={entry.gpa}
                                onChange={(event) => handleChange(index, "gpa", event.target.value)}
                            />
                            <label htmlFor="start-date">Start Date:</label>
                            <input 
                                type="text"
                                placeholder="Ex: Aug. 2025, June 2026..."
                                value={entry.startDate}
                                onChange={(event) => handleChange(index, "startDate", event.target.value)}
                            />
                            <label htmlFor="end-date">End Date:</label>
                            <input 
                                type="text"
                                placeholder="Ex: Aug. 2025, June 2026, Present..."
                                value={entry.endDate}
                                onChange={(event) => handleChange(index, "endDate", event.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={addEducation}>Add</button>
                </div>
            )}
        </div>
    );
    
}

export default Education;