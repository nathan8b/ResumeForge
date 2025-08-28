function PersonalInfo({data, setData}) {
    return (
        <div className="section">
            <h2>Personal Info</h2>

            <label for="name">Full Name:</label>
            <input 
                type="name"
                placeholder="Enter full name..."
                value={data.name}
                onChange={(event) => setData({ ...data, name: event.target.value})}
            />

            <label for="phone">Phone Number:</label>
                <input 
                    type="tel"
                    placeholder="Enter phone number..."
                    value={data.phone}
                    onChange={(event) => setData({ ...data, phone: event.target.value})}
            />

            <label for="email">Email:</label>
            <input 
                type="email"
                placeholder="Enter email..."
                value={data.email}
                onChange={(event) => setData({ ...data, email: event.target.value})}
            />

            <label for="linkedin">LinkedIn Link:</label>
            <input 
                type="text"
                placeholder="Enter LinkedIn link..."
                value={data.linkedin}
                onChange={(event) => setData({ ...data, linkedin: event.target.value})}
            />

            <label for="github">GitHub Link:</label>
            <input 
                type="text"
                placeholder="Enter GitHub link..."
                value={data.github}
                onChange={(event) => setData({ ...data, github: event.target.value})}
            />
        </div>


    )
}

export default PersonalInfo;