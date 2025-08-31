import { useState } from "react";

function Experience({data, setData}) {
    const [open, setOpen] = useState(false);

    const handleChange = (index, field, value) => {
        const newExperience = [...data];
        newExperience[index][field] = value;
        setData(newExperience);
    }

    const addExperience = () => {
        setData([...data, {company: "", location: "", position: "", startDate: "", EndDate: "", description: ""}]);
    }

    const removeExperience = (index) => {
        const newExperience = data.filter((_, i) => i !== index);
        setData(newExperience);
    }

    return (
        <div className="section">
            <h2
                className="section-header"
                onClick={() => setOpen(!open)}
            >
                <span>Experience</span>
                <span>{open ? "▲" : "▼"}</span>
            </h2>
            
            {open && (
                <div className="section-content">
                    {data.map((entry, index) => (
                        <div key={index} className="sub-section">

                            <div className="entry-header">
                                <h3 className="sub-title">Experience #{index+1}</h3>
                                {data.length > 1 && (
                                    <button className="delete-button" onClick={() => removeExperience(index)}>Delete</button>
                                )}                    
                            </div>
                            
                            <label htmlFor="company">Company:</label>
                            <input 
                                type="text"
                                placeholder="Enter company name..."
                                value={entry.company}
                                onChange={(event) => handleChange(index, "company", event.target.value)}
                            />
                            <label htmlFor="location">Location:</label>
                            <input 
                                type="text"
                                placeholder="Ex: Athens, OH..."
                                value={entry.location}
                                onChange={(event) => handleChange(index, "location", event.target.value)}
                            />
                            <label htmlFor="position">Job Title:</label>
                            <input 
                                type="text"
                                placeholder="Enter job title..."
                                value={entry.position}
                                onChange={(event) => handleChange(index, "position", event.target.value)}
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
                            <label htmlFor="description">Description:</label>
                            <textarea
                                rows={6}
                                placeholder="Enter bullet points (one bullet per line)..."
                                value={entry.description}
                                onChange={(event) => handleChange(index, "description", event.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={addExperience}>Add</button>
                </div>
            )}
        </div>
    );
}

export default Experience;