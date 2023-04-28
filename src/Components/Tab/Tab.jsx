import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { auth } from "../../atoms/auth";
import { AiFillCaretDown } from "react-icons/ai";

const Tab = ({ content }) => {
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(auth);
    const [list, setList] = useState(false);

    return (
        <div className="Tab">
            <div className="navbar">
                <span className="logo">Paie</span>
                <ul className="one">
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
                        className="ctr"
                        onClick={() => {
                            setList(!list);
                        }}
                    >
                        Critères
                        <AiFillCaretDown />
                        {list && (
                            <ul className="ctr-ul">
                                <li
                                    onClick={() => {
                                        window.open(
                                            "https://docs.google.com/spreadsheets/d/1TfcSETC2keNaInGJzZhqHeI0AzOjGSxa/edit?usp=sharing&ouid=103241180489139027903&rtpof=true&sd=true",
                                            "_blank"
                                        );
                                    }}
                                >
                                    Nomenclature
                                </li>

                                <li
                                    onClick={() => {
                                        window.open(
                                            "https://docs.google.com/spreadsheets/d/1vSq5sODAdOIPAuraxIMK0n__PZyIcHn_/edit?usp=sharing&ouid=103241180489139027903&rtpof=true&sd=true",
                                            "_blank"
                                        );
                                    }}
                                >
                                    IRG
                                </li>
                                <li
                                    onClick={() => {
                                        window.open(
                                            "https://docs.google.com/spreadsheets/d/1s2P1Y7LQZJ5vBShhtZdwVoDjcWOKPuKS/edit?usp=sharing&ouid=103241180489139027903&rtpof=true&sd=true",
                                            "_blank"
                                        );
                                    }}
                                >
                                    Grille de salaire
                                </li>
                            </ul>
                        )}
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
            </div>

            <div className="Tab-content">{content}</div>
        </div>
    );
};

export default Tab;
