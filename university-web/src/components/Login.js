import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const { login } = useContext(AuthContext);
    const [creds, setCreds] = useState({
        username: "",
        password: ""
    });
    //const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "https://universityportal-8v78.onrender.com/api-token-auth/",
                creds
            );

            const token = res.data.token;

            localStorage.setItem("userToken", token);

            axios.defaults.headers.common[
                "Authorization"
            ] = `Token ${token}`;
            login({ username: creds.username });
            
            alert("Login Successful!");

        } catch (err) {
            alert("Invalid Credentials");
            console.log(err.response?.data);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
            />
            <br />

            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
        );
}

export default Login;