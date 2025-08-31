function Projects({data, setData}) {
    const handleChange = (index, field, value) => {
        const newProject = [...data];
        newProject[index][field] = value;
        setData(newProject);
    }

    const addProject = () => {
        setData([...data, {company: "", position: "", startDate: "", EndDate: "", description: ""}]);
    }

    const removeProject = (index) => {
        const newProject = data.filter((_, i) => i !== index);
        setData(newProject);
    }

    return (
        <div className="section">
            <h2>Projects</h2>
            {data.map((entry, index) => (
                <div key={index} className="sub-section">

                    <div className="entry-header">
                        <h3 className="sub-title">Project #{index+1}</h3>
                        {data.length > 1 && (
                            <button className="delete-button" onClick={() => removeProject(index)}>Delete</button>
                        )}
                    </div>
                    
                    <label htmlFor="title">Project Title:</label>
                    <input 
                        type="text"
                        placeholder="Enter project title..."
                        value={entry.title}
                        onChange={(event) => handleChange(index, "title", event.target.value)}
                    />
                    <label htmlFor="tools">Tools:</label>
                    <input 
                        type="text"
                        placeholder="Ex: JavaScript, React, CSS..."
                        value={entry.tools}
                        onChange={(event) => handleChange(index, "tools", event.target.value)}
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
                        placeholder="Enter a description..."
                        value={entry.description}
                        onChange={(event) => handleChange(index, "description", event.target.value)}
                    />
                    <label htmlFor="link">Link (optional):</label>
                    <input 
                        type="link"
                        placeholder="Enter GitHub or live project link..."
                        value={entry.link}
                        onChange={(event) => handleChange(index, "link", event.target.value)}
                    />
                </div>
            ))}
            <button onClick={addProject}>Add</button>
        </div>
    );
}

export default Projects;
