function Experience({data, setData}) {
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
            <h2>Experience</h2>
            {data.map((entry, index) => (
                <div key={index} className="sub-section">

                    <div className="entry-header">
                        <h3 className="sub-title">Experience #{index+1}</h3>
                        <button className="delete-button" onClick={() => removeExperience(index)}>Delete</button>
                    </div>
                    
                    <label for="company">Company:</label>
                    <input 
                        type="text"
                        placeholder="Enter company name..."
                        value={entry.company}
                        onChange={(event) => handleChange(index, "company", event.target.value)}
                    />
                    <label for="location">Location:</label>
                    <input 
                        type="text"
                        placeholder="Ex: Athens, OH..."
                        value={entry.location}
                        onChange={(event) => handleChange(index, "location", event.target.value)}
                    />
                    <label for="position">Job Title:</label>
                    <input 
                        type="text"
                        placeholder="Enter job title..."
                        value={entry.position}
                        onChange={(event) => handleChange(index, "position", event.target.value)}
                    />
                    <label for="start-date">Start Date:</label>
                    <input 
                        type="text"
                        placeholder="Ex: Aug. 2025, June 2026..."
                        value={entry.startDate}
                        onChange={(event) => handleChange(index, "startDate", event.target.value)}
                    />
                    <label for="end-date">End Date:</label>
                    <input 
                        type="text"
                        placeholder="Ex: Aug. 2025, June 2026, Present..."
                        value={entry.endDate}
                        onChange={(event) => handleChange(index, "endDate", event.target.value)}
                    />
                    <label for="description">Description:</label>
                    <textarea
                        rows={6}
                        placeholder="Enter a description..."
                        value={entry.description}
                        onChange={(event) => handleChange(index, "description", event.target.value)}
                    />
                </div>
            ))}
            <button onClick={addExperience}>Add</button>
        </div>
    );
}

export default Experience;