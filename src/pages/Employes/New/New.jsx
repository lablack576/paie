import React, { useEffect, useState } from "react";
import "./New.css";
import { useParams } from "react-router-dom";
import Tab from "../../../Components/Tab/Tab";
import axios from "axios";
import { FaBackward, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth } from "../../../atoms/auth";

const New = () => {
    const { uid } = useRecoilValue(auth);
    const { itemID } = useParams();
    const navigate = useNavigate();
    const [employe, setEmploye] = useState({
        id: "",
        Avance: "",
        Date_naissance: "",
        Date_recrutement: "",
        Ech: "",
        IEP: "",
        IND_Transport: "",
        Indice_salaire_unique: "On",
        Matricule: "",
        NSS: "",
        Nom: "",
        PRI: "",
        Poste: "",
        Prenom: "",
        Pret: "",
        Prime_caisse: "On",
        allocation_familial: "On",
        Prime_technicite: "",
    });

    const handleChange = (e) => {
        const { name } = e.target;
        setEmploye((prevEmploye) => ({
            ...prevEmploye,
            [name]: e.target.value,
        }));
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/employees/${itemID}/${uid}`
                );
                setEmploye({
                    id: uid,
                    Avance: response.data.Avance,
                    Date_naissance: response.data.Date_naissance,
                    Date_recrutement: response.data.Date_recrutement,
                    Ech: response.data.Ech,
                    IEP: response.data.IEP,
                    IND_Transport: response.data.IND_Transport,
                    Indice_salaire_unique: response.data.Indice_salaire_unique,
                    Matricule: response.data.Matricule,
                    NSS: response.data.NSS,
                    Nom: response.data.Nom,
                    PRI: response.data.PRI,
                    Poste: response.data.Poste,
                    Prenom: response.data.Prenom,
                    Pret: response.data.Pret,
                    Prime_caisse: response.data.Prime_caisse,
                    allocation_familial: response.data.allocation_familial,
                    Prime_technicite: response.data.Prime_technicite,
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchEmployee();
    }, [itemID, uid]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(
                `http://localhost:3001/employees/${employe.Matricule}`,
                employe
            )
            .then((response) => {
                console.log(response.data);
                // Handle successful update here
            })
            .catch((error) => {
                console.error(error);
                // Handle error here
            });
    };

    const handleDelete = (matricule) => {
        axios
            .delete(`http://localhost:3001/employeesDelete/${matricule}/${uid}`)
            .then((response) => {
                console.log("Employee record deleted successfully");
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <Tab
            content={
                employe ? (
                    <>
                        <p
                            onClick={() => window.history.back()}
                            className="return"
                        >
                            <span>Retour</span> <FaBackward />
                        </p>
                        <p
                            onClick={() => handleDelete(itemID)}
                            className="return"
                        >
                            <span>Effacer</span> <FaTrash />
                        </p>
                        <form className="newForm" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="Nom">Nom</label>
                                <input
                                    type="text"
                                    name="Nom"
                                    value={employe.Nom}
                                    onChange={handleChange}
                                    placeholder="Nom"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Prenom">Prenom</label>
                                <input
                                    type="text"
                                    name="Prenom"
                                    value={employe.Prenom}
                                    onChange={handleChange}
                                    placeholder="Prenom"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Poste">Poste</label>
                                <input
                                    type="number"
                                    name="Poste"
                                    value={employe.Poste}
                                    onChange={handleChange}
                                    placeholder="Poste"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="NSS">
                                    Numéro de la sécurité sociale
                                </label>
                                <input
                                    type="number"
                                    name="NSS"
                                    value={employe.NSS}
                                    onChange={handleChange}
                                    placeholder="Numéro de la sécurité sociale"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Date_naissance">
                                    Date de naissance
                                </label>
                                <input
                                    type="date"
                                    name="Date_naissance"
                                    value={employe.Date_naissance}
                                    onChange={handleChange}
                                    placeholder="Date de naissance"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Date_recrutement">
                                    Date de recrutement
                                </label>
                                <input
                                    type="date"
                                    name="Date_recrutement"
                                    value={employe.Date_recrutement}
                                    onChange={handleChange}
                                    placeholder="Date de recrutement"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Ech">Echelon</label>
                                <input
                                    min="1"
                                    max="18"
                                    type="number"
                                    name="Ech"
                                    value={employe.Ech}
                                    onChange={handleChange}
                                    placeholder="Echelon"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="IEP">IEP</label>
                                <input
                                    min="0"
                                    max="60"
                                    type="number"
                                    name="IEP"
                                    value={employe.IEP}
                                    onChange={handleChange}
                                    placeholder="IEP"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="PRI">PRI</label>
                                <input
                                    min="0"
                                    max="20"
                                    type="number"
                                    name="PRI"
                                    value={employe.PRI}
                                    onChange={handleChange}
                                    placeholder="PRI"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="IND_Transport">
                                    Indice de transport
                                </label>
                                <input
                                    type="number"
                                    name="IND_Transport"
                                    value={employe.IND_Transport}
                                    onChange={handleChange}
                                    placeholder="Indice de transport"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Indice_salaire_unique">
                                    Indice de salaire unique
                                </label>
                                <select
                                    name="Indice_salaire_unique"
                                    value={employe.Indice_salaire_unique}
                                    onChange={handleChange}
                                >
                                    <option value="On">Allouer</option>
                                    <option value={0}>Ne pas allouer</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="Prime_technicite">
                                    Prime de technicité
                                </label>
                                <input
                                    type="number"
                                    name="Prime_technicite"
                                    value={employe.Prime_technicite}
                                    onChange={handleChange}
                                    placeholder="Prime de technicité"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="allocation_familial">
                                    Allocation familial
                                </label>
                                <select
                                    name="allocation_familial"
                                    value={employe.allocation_familial}
                                    onChange={handleChange}
                                >
                                    <option value="On">Allouer</option>
                                    <option value={0}>Ne pas allouer</option>
                                </select>
                                <label htmlFor="Prime_caisse">
                                    Prime de caisse
                                </label>
                                <select
                                    name="Prime_caisse"
                                    value={employe.Prime_caisse}
                                    onChange={handleChange}
                                >
                                    <option value="On">Allouer</option>
                                    <option value={0}>Ne pas allouer</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="Pret">Prêt</label>
                                <input
                                    type="number"
                                    name="Pret"
                                    value={employe.Pret}
                                    onChange={handleChange}
                                    placeholder="Prêt"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="Avance">Avance</label>
                                <input
                                    type="number"
                                    name="Avance"
                                    value={employe.Avance}
                                    onChange={handleChange}
                                    placeholder="Avance"
                                    required
                                />
                            </div>
                            <button type="submit">Modifier</button>
                        </form>
                    </>
                ) : (
                    <p>Loading...</p>
                )
            }
        />
    );
};

export default New;
