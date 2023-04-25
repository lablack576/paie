import React from "react";
import "./Tab.css";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { auth } from "../../atoms/auth";

const Tab = ({ content }) => {
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(auth);

    return (
        <div className="Tab">
            <h1 className="title">Logiciel de gestion de paie</h1>
            <ul className="nav">
                <li
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Employés
                </li>
                <li
                    onClick={() => {
                        navigate("/Parametres");
                    }}
                >
                    Paramètres
                </li>
                <li
                    onClick={() => {
                        navigate("/Generate");
                    }}
                >
                    Générer
                </li>
                <li
                    onClick={() => {
                        setAuth((prev) => ({
                            uid: null,
                            user: null,
                            isAuth: false,
                        }));
                    }}
                >
                    Déconnexion
                </li>
            </ul>
            <div className="content">{content}</div>
        </div>
    );
};

export default Tab;
