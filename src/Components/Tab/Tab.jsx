import React from "react";
import "./Tab.css";
import { useNavigate } from "react-router-dom";

const Tab = ({ content }) => {
    const navigate = useNavigate();

    return (
        <div className="Tab">
            <h1 className="title">🇩🇿 Logiciel de gestion de paie</h1>
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
            </ul>
            <div className="content">{content}</div>
        </div>
    );
};

export default Tab;
