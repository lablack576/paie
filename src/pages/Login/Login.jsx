import React, { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { auth } from "../../atoms/auth";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const setAuth = useSetRecoilState(auth);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios
                .get(`http://localhost:3001/users/login`, {
                    username,
                    password,
                })
                .then((response) => {
                    if (response.data.rowCount !== 0) {
                        setAuth(() => ({
                            isAuth: true,
                            user: username,
                        }));
                    }
                });
            setUsername("");
            setPassword("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
