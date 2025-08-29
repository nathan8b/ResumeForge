function Skills({data, setData}) {
    return (
        <div className="section">
            <h2>Skills</h2>

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
    )
}

export default Skills;