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
            <ul className="vvv">
                <li>
                    <a
                        rel="noreferrer"
                        href="https://docs.google.com/spreadsheets/d/1TfcSETC2keNaInGJzZhqHeI0AzOjGSxa/edit?usp=sharing&ouid=103241180489139027903&rtpof=true&sd=true"
                        target="_blank"
                    >
                        Nomenclature
                    </a>
                </li>
                <li>
                    <a
                        rel="noreferrer"
                        href="https://docs.google.com/spreadsheets/d/1vSq5sODAdOIPAuraxIMK0n__PZyIcHn_/edit?usp=sharing&ouid=103241180489139027903&rtpof=true&sd=true"
                        target="_blank"
                    >
                        IRG
                    </a>
                </li>
                <li>
                    <a
                        rel="noreferrer"
                        href="https://docs.google.com/spreadsheets/d/1s2P1Y7LQZJ5vBShhtZdwVoDjcWOKPuKS/edit?usp=sharing&ouid=103241180489139027903&rtpof=true&sd=true"
                        target="_blank"
                    >
                        Grille de salaire
                    </a>
                </li>
            </ul>
            <div className="content">{content}</div>
        </div>
    );
};

export default Tab;
