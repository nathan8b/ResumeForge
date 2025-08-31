import { useState } from "react";

function Skills({data, setData}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="section">
            <h2
                className="section-header"
                onClick={() => setOpen(!open)}
            >
                <span>Skills</span>
                <span>{open ? "▲" : "▼"}</span>
            </h2>

            {open && (
                <div className="section-content">
                    <label htmlFor="languages">Languages:</label>
                    <input 
                        type="text"
                        placeholder="Ex: JavaScript, Python, C++..."
                        value={data.languages}
                        onChange={(event) => setData({ ...data, languages: event.target.value})}
                    />

                    <label htmlFor="frameworks">Frameworks:</label>
                        <input 
                            type="text"
                            placeholder="Ex: React, Node.js, Flask..."
                            value={data.frameworks}
                            onChange={(event) => setData({ ...data, frameworks: event.target.value})}
                    />

                    <label htmlFor="tools">Tools:</label>
                    <input 
                        type="text"
                        placeholder="Ex: Git, VS Code, Docker..."
                        value={data.tools}
                        onChange={(event) => setData({ ...data, tools: event.target.value})}
                    />
                </div>
            )}
        </div>
    )
}

export default Skills;