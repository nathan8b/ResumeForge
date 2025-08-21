function PersonalInfo({ data, setData}) {
    return (
        <div className="section">
            <h2>Personal Info</h2>

            <label for="name">Full Name:</label>
            <input 
                type="name"
                placeholder="Name"
                value={data.name}
                onChange={(event) => setData({ ...data, name: event.target.value})}
            />

            <label for="email">Email:</label>
            <input 
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(event) => setData({ ...data, email: event.target.value})}
            />

            <label for="phone">Phone Number:</label>
            <input 
                type="tel"
                placeholder="1001001000"
                value={data.phone}
                onChange={(event) => setData({ ...data, phone: event.target.value})}
            />

            <label for="state">Location:</label>
            <input 
                type="text"
                placeholder="Location"
                autoComplete="address-level1"
                value={data.location}
                onChange={(event) => setData({ ...data, location: event.target.value})}
            />
        </div>


    )
}

export default PersonalInfo;