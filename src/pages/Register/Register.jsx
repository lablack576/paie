import React, { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { auth } from "../../atoms/auth";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(auth);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(`http://localhost:3001/users`, {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    if (response.data) {
                        setAuth(() => ({
                            isAuth: true,
                            user: response.data.username,
                            uid: response.data.id,
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
            <form onSubmit={handleRegister}>
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
                <button type="submit">Créer un compte</button>
                <br />
                <p className="hdForm">
                    Déjà inscrit ?
                    <span
                        onClick={() => {
                            navigate("/Login");
                        }}
                    >
                        Connectez-vous.
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
