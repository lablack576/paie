import React, { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { auth } from "../../atoms/auth";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const setAuth = useSetRecoilState(auth);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios
                .get(`http://localhost:3001/users/login`, {
                    params: {
                        username: username,
                        password: password,
                    },
                })
                .then((response) => {
                    if (response.data.length) {
                        setAuth(() => ({
                            isAuth: true,
                            user: response.data[0].username,
                            uid: response.data[0].id,
                        }));
                        setError(false);
                    } else {
                        setError(true);
                    }
                });
            setUsername("");
            setPassword("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="formX">
            {" "}
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Nom d'utilisateur :</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Nom d'utilisateur"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p>Nom d'utilisateur ou mot de passe incorret</p>}
                <br />
                <button type="submit">Se connecter</button>
                <br />
                <p className="hdForm">
                    Pas encore membre ?
                    <span
                        onClick={() => {
                            navigate("/Register");
                        }}
                    >
                        Inscrivez-vous.
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
