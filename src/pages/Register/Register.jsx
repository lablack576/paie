import React, { useState } from "react";
import axios from "axios";

import { useSetRecoilState } from "recoil";
import { auth } from "../../atoms/auth";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const setAuth = useSetRecoilState(auth);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(
                    `http://localhost:3001/users?username=${username}&password=${password}`
                )
                .then((response) => {
                    if (response.data) {
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
        <form onSubmit={handleRegister}>
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
            <button type="submit">Create Account</button>
        </form>
    );
};

export default Register;
