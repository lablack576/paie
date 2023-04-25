import React, { useState, useEffect } from "react";
import axios from "axios";

const ParametresContent = () => {
    const [form, setForm] = useState({
        PRC: "",
        Indice_panier: "",
        Prime_caisse: "",
        RET: "",
        Indice_salaire_unique: "",
        allocation_familial: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/collective")
            .then((response) => {
                setForm({
                    PRC: response.data[0].PRC,
                    Indice_panier: response.data[0].Indice_panier,
                    Prime_caisse: response.data[0].Prime_caisse,
                    RET: response.data[0].RET,
                    Indice_salaire_unique:
                        response.data[0].Indice_salaire_unique,
                    allocation_familial: response.data[0].allocation_familial,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put("http://localhost:3001/collective", form)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="ParametresContent">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="PRC">PRC</label>
                    <input
                        min="0"
                        max="20"
                        type="number"
                        name="PRC"
                        value={form.PRC}
                        onChange={handleChange}
                        placeholder="PRC"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Indice_panier">Indice panier</label>
                    <input
                        type="number"
                        name="Indice_panier"
                        value={form.Indice_panier}
                        onChange={handleChange}
                        placeholder="Indice panier"
                        min="0"
                        max="31"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Prime_caisse">Prime de caisse</label>
                    <input
                        type="number"
                        name="Prime_caisse"
                        value={form.Prime_caisse}
                        onChange={handleChange}
                        placeholder="Prime de caisse"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="RET">RET</label>
                    <input
                        type="number"
                        name="RET"
                        value={form.RET}
                        onChange={handleChange}
                        placeholder="RET"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Indice_salaire_unique">
                        Indice salaire unique
                    </label>
                    <input
                        type="number"
                        name="Indice_salaire_unique"
                        value={form.Indice_salaire_unique}
                        onChange={handleChange}
                        placeholder="Indice salaire unique"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="allocation_familial">
                        Allocation familiale
                    </label>
                    <input
                        type="number"
                        name="allocation_familial"
                        value={form.allocation_familial}
                        onChange={handleChange}
                        placeholder="Allocation familiale"
                        required
                    />
                </div>

                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default ParametresContent;
