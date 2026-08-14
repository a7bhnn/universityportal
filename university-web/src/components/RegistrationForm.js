import React, { useState } from 'react';
import axios from 'axios';
function RegistrationForm() {
    const [formData, setFormData] = useState({
        first_Name: '',
        last_Name: '',
        email: '',
        profile_pic: null,
        role: 'student'
    });
     const [message, setMessage] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState =>({
            ...prevState,
            profile_pic: e.target.files[0]
        }))
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('first_name', formData.first_Name);
        data.append('last_name', formData.last_Name);
        data.append('email', formData.email);
        
        if (formData.profile_pic) {
            data.append('profile_pic', formData.profile_pic);
        }

        try {
            const response = await axios.post('https://universityportal-8v78.onrender.com/academic/api/students/', data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log(response);
            setMessage("Student Created! ID: " + response.data.id);
            setFormData({
                first_Name: '',
                last_Name: '',
                email: '',
                profile_pic: null,
            });

        } catch (error) {
            console.log("ERROR:", error.response?.data);
            setMessage("Failed to save data.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <input
                name="first_Name"
                placeholder='First Name'
                value={formData.first_Name}
                onChange={handleChange}
            />
            <input
                name="last_Name"
                placeholder='Last Name'
                value={formData.last_Name}
                onChange={handleChange}
            />

            <input
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
            />

            <input
                name="profile_pic"
                type="file"
                placeholder='Profile Picture'
                onChange={handleFileChange}
            />

            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>

            <button type="submit">Register</button>
        </form>
        <p>{message}</p>
    </div>
);
}

export default RegistrationForm;