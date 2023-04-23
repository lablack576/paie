import React, { useState } from "react";
import "./Add.css";
import Tab from "../../../Components/Tab/Tab";
import axios from "axios";
import { FaBackward } from "react-icons/fa";

const Add = () => {
    const [employe, setEmploye] = useState({
        Avance: "",
        Date_naissance: "",
        Date_recrutement: "",
        Ech: "",
        IEP: "",
        IND_Transport: "",
        Indice_salaire_unique: "",
        Matricule: "",
        NSS: "",
        Nom: "",
        PRI: "",
        Poste: "",
        Prenom: "",
        Pret: "",
        Prime_caisse: "",
        allocation_familial: "",
        Prime_technicite: "",
    });

    const handleChange = (e) => {
        const { name } = e.target;
        setEmploye((prevEmploye) => ({
            ...prevEmploye,
            [name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3001/employees/add",
                employe
            );
            setEmploye({
                Avance: "",
                Date_naissance: "",
                Date_recrutement: "",
                Ech: "",
                IEP: "",
                IND_Transport: "",
                Indice_salaire_unique: "",
                Matricule: "",
                NSS: "",
                Nom: "",
                PRI: "",
                Poste: "",
                Prenom: "",
                Pret: "",
                Prime_caisse: "",
                allocation_familial: "",
                Prime_technicite: "",
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Tab
            content={
                <>
                    {" "}
                    <p onClick={() => window.history.back()} className="return">
                        <span>Retour</span> <FaBackward />
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
                            <input
                                type="checkbox"
                                checked={employe.Indice_salaire_unique}
                                name="Indice_salaire_unique"
                                onChange={handleChange}
                                placeholder="Indice de salaire unique"
                            />
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
                            <input
                                type="checkbox"
                                checked={employe.allocation_familial}
                                name="allocation_familial"
                                onChange={handleChange}
                                placeholder="Allocation familial"
                            />
                            <label htmlFor="Prime_caisse">
                                Prime de caisse
                            </label>
                            <input
                                type="checkbox"
                                checked={employe.Prime_caisse}
                                name="Prime_caisse"
                                onChange={handleChange}
                                placeholder="Prime de caisse"
                            />
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
                        <button type="submit">Ajouter</button>
                    </form>
                </>
            }
        />
    );
};

export default Add;
