import { useState } from "react";

function PersonalInfo({data, setData}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="section">
            <h2
                className="section-header"
                onClick={() => setOpen(!open)}
            >
                <span>Personal Info</span>
                <span>{open ? "▲" : "▼"}</span>
            </h2>

            {open && (
                <div className="section-content">
                    <label htmlFor="name">Full Name:</label>
                    <input 
                        type="name"
                        placeholder="Enter full name..."
                        value={data.name}
                        onChange={(event) => setData({ ...data, name: event.target.value})}
                    />

                    <label htmlFor="phone">Phone Number:</label>
                        <input 
                            type="tel"
                            placeholder="Enter phone number..."
                            value={data.phone}
                            onChange={(event) => setData({ ...data, phone: event.target.value})}
                    />

                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        placeholder="Enter email..."
                        value={data.email}
                        onChange={(event) => setData({ ...data, email: event.target.value})}
                    />

                    <label htmlFor="linkedin">LinkedIn Link:</label>
                    <input 
                        type="text"
                        placeholder="Enter LinkedIn link..."
                        value={data.linkedin}
                        onChange={(event) => setData({ ...data, linkedin: event.target.value})}
                    />

                    <label htmlFor="github">GitHub Link:</label>
                    <input 
                        type="text"
                        placeholder="Enter GitHub link..."
                        value={data.github}
                        onChange={(event) => setData({ ...data, github: event.target.value})}
                    />
                </div>
            )}
        </div>
    )
}

export default PersonalInfo;