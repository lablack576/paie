import React, { useState, useEffect } from "react";
import axios from "axios";
import XLSX from "xlsx";
import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";

const GenerateContent = () => {
    const { uid } = useRecoilValue(auth);
    const [employees, setEmployees] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
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
            .get(`http://localhost:3001/collective/${uid}`)
            .then((response) => {
                setForm({
                    PRC: response.data[0].PRC,
                    Indice_panier: response.data[0].Indice_panier,
                    Prime_caisse: response.data[0].Prime_caisse,
                    RET: response.data[0].RET,
                    Indice_salaire_unique:
                        response.data[0].Indice_salaire_unique,
                    allocation_familial: response.data[0].allocation_familial,
                    salaire_brute: "",
                    salaire_imposable: "",
                    Salaire_base: "",
                    Salaire_cotisable: "",
                    Retenu_ss: "",
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const exportToExcel = (data) => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data, {
            header: [
                "Matricule",
                "Nom",
                "Prenom",
                "Date_naissance",
                "Date_recrutement",
                "NSS",
                "Poste",
                "Ech",
                "IND_Transport",
                "Indice_salaire_unique",
                "IEP",
                "PRI",
                "Prime_technicite",
                "Pret",
                "Avance",
                "Prime_caisse",
                "allocation_familial",
                "Ind",
                "Salaire_base",
                "Salaire_cotisable",
                "Retenu_ss",
                "salaire_brute",
                "salaire_imposable",
                "IRG",
                "salaire_net",
            ],
        });
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, "Journal de paie.xlsx");
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await axios.get(
                `http://localhost:3001/employees?id=${uid}`
            );
            setEmployees(res.data);
        };
        fetchEmployees();
    }, [uid]);

    const handleNext = () => {
        if (currentIndex < employees.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsFinished(true);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleChange = (e, currentIndex) => {
        const { name, value } = e.target;
        setEmployees((prevEmployees) => {
            const updatedEmployees = [...prevEmployees];
            updatedEmployees[currentIndex][name] = parseInt(value);
            return updatedEmployees;
        });
    };

    const submitForm = (e, currentIndex) => {
        e.preventDefault();
        axios
            .put(
                `http://localhost:3001/employees/${employees[currentIndex].Matricule}`,
                employees[currentIndex]
            )
            .then(async (response) => {
                try {
                    const response = await axios.get(
                        `http://localhost:3001/salaire/${employees[currentIndex].Poste}/${employees[currentIndex].Ech}`
                    );
                    await setEmployees((prevEmployees) => {
                        const updatedEmployees = [...prevEmployees];
                        updatedEmployees[currentIndex].Ind = parseInt(
                            response.data.Ind
                        );
                        return updatedEmployees;
                    });
                } catch (error) {
                    console.error(error);
                }
                await setEmployees((prevEmployees) => {
                    const updatedEmployees = [...prevEmployees];
                    updatedEmployees[currentIndex].Salaire_base = parseInt(
                        updatedEmployees[currentIndex].Ind * 43
                    );
                    return updatedEmployees;
                });
                await setEmployees((prevEmployees) => {
                    const updatedEmployees = [...prevEmployees];
                    updatedEmployees[currentIndex].Salaire_cotisable = parseInt(
                        updatedEmployees[currentIndex].Salaire_base +
                            updatedEmployees[currentIndex].Salaire_base *
                                (updatedEmployees[currentIndex].IEP / 100 +
                                    updatedEmployees[currentIndex].PRI / 100 +
                                    form.PRC / 100) +
                            updatedEmployees[currentIndex].Prime_technicite
                    );
                    return updatedEmployees;
                });
                await setEmployees((prevEmployees) => {
                    const updatedEmployees = [...prevEmployees];
                    updatedEmployees[currentIndex].Retenu_ss = parseInt(
                        updatedEmployees[currentIndex].Salaire_cotisable * -0.09
                    );
                    return updatedEmployees;
                });
                await setEmployees((prevEmployees) => {
                    const updatedEmployees = [...prevEmployees];
                    updatedEmployees[currentIndex].salaire_brute = parseInt(
                        updatedEmployees[currentIndex].Salaire_cotisable +
                            form.Indice_panier * 400 +
                            updatedEmployees[currentIndex].IND_Transport +
                            (updatedEmployees[currentIndex].Prime_caisse &&
                                form.Prime_caisse)
                    );
                    return updatedEmployees;
                });
                await setEmployees((prevEmployees) => {
                    const updatedEmployees = [...prevEmployees];

                    const res =
                        updatedEmployees[currentIndex].Retenu_ss +
                        updatedEmployees[currentIndex].salaire_brute;

                    updatedEmployees[currentIndex].salaire_imposable = parseInt(
                        Math.floor(res / 10) * 10
                    );

                    axios
                        .get(
                            `http://localhost:3001/irg/${updatedEmployees[currentIndex].salaire_imposable}`
                        )
                        .then((response) => {
                            setEmployees((prevEmployees) => {
                                const updatedEmployees = [...prevEmployees];
                                updatedEmployees[currentIndex].IRG = parseFloat(
                                    response.data[0].IRG.replace(",", "").split(
                                        "."
                                    )[0]
                                );
                                updatedEmployees[currentIndex].salaire_net =
                                    parseInt(
                                        employees[currentIndex].salaire_brute +
                                            employees[currentIndex].Retenu_ss -
                                            updatedEmployees[currentIndex].IRG -
                                            employees[currentIndex].Pret -
                                            employees[currentIndex].Avance +
                                            form.RET +
                                            (employees[currentIndex]
                                                .Indice_salaire_unique
                                                ? form.Indice_salaire_unique
                                                : 0) +
                                            (employees[currentIndex]
                                                .allocation_familial
                                                ? form.allocation_familial
                                                : 0)
                                    );
                                return updatedEmployees;
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                    return updatedEmployees;
                });
                handleNext();
                // Handle successful update here
            })
            .catch((error) => {
                console.error(error);
                // Handle error here
            });
    };

    if (isFinished) {
        return (
            <div className="final_finished">
                <button
                    onClick={() => {
                        exportToExcel(employees);
                    }}
                >
                    Générer le Journal de paie
                </button>
            </div>
        );
    }

    return (employees ? employees.length !== 0 : false) ? (
        <>
            <h1>
                Employé {currentIndex + 1} sur {employees.length}
            </h1>
            <br />
            <div>
                {employees[currentIndex].Nom +
                    " " +
                    employees[currentIndex].Prenom}
            </div>
            <br />
            <form
                className="newForm"
                onSubmit={(e) => {
                    submitForm(e, currentIndex);
                }}
            >
                <div>
                    <label htmlFor="PRI">PRI</label>
                    <input
                        min="0"
                        max="20"
                        type="number"
                        name="PRI"
                        value={employees[currentIndex].PRI}
                        onChange={(e) => {
                            handleChange(e, currentIndex);
                        }}
                        placeholder="PRI"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Prime_technicite">
                        Prime de technicité
                    </label>
                    <input
                        type="number"
                        name="Prime_technicite"
                        value={employees[currentIndex].Prime_technicite}
                        onChange={(e) => {
                            handleChange(e, currentIndex);
                        }}
                        placeholder="Prime de technicité"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Absence">Absence</label>
                    <input
                        min="0"
                        max="31"
                        type="number"
                        name="Absence"
                        value={
                            employees[currentIndex].Absence
                                ? employees[currentIndex].Absence
                                : 0
                        }
                        onChange={(e) => {
                            handleChange(e, currentIndex);
                        }}
                        placeholder="Absence"
                        required
                    />
                </div>

                <div className="pivot">
                    <button
                        disabled={currentIndex === 0}
                        onClick={handlePrevious}
                    >
                        Previous
                    </button>
                    <button type="submit">
                        {currentIndex === employees.length - 1
                            ? "Finish"
                            : "Next"}
                    </button>
                </div>
            </form>
        </>
    ) : (
        "Liste vide, veuillez d'abord saisir des employées"
    );
};

export default GenerateContent;
