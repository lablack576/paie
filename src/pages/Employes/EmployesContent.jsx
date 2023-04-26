import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth } from "../../atoms/auth";

const EmployesContent = () => {
    const { uid } = useRecoilValue(auth);
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await axios.get(
                `http://localhost:3001/employees?search=${searchTerm}&id=${uid}`
            );
            setEmployees(res.data);
        };
        fetchEmployees();
    }, [searchTerm, uid]);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(
        indexOfFirstEmployee,
        indexOfLastEmployee
    );

    const renderEmployee = (employee, idx) => {
        return (
            <tr key={idx}>
                <td>{employee.Matricule}</td>
                <td>{employee.Nom}</td>
                <td>{employee.Prenom}</td>
                <td>{employee.Date_naissance}</td>
                <td>{employee.Poste}</td>
                <td>
                    <FiEye
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/new/${employee.Matricule}`)}
                    />
                </td>
            </tr>
        );
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="EmployesContent">
            <div className="header">
                <h1>Liste des employés</h1>
                <button
                    onClick={() => {
                        navigate("/Add");
                    }}
                >
                    Ajouter
                </button>
            </div>
            <div className="inputSearch">
                <input
                    type="text"
                    placeholder="Rechercher par nom ou prénom..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <FiSearch id="icon" />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Matricule</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Date_naissance</th>
                        <th>Poste</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map((employee, idx) =>
                        renderEmployee(employee, idx)
                    )}
                </tbody>
            </table>
            <ul className="pagination">
                {pageNumbers.map((pageNumber, idx) => (
                    <li key={idx}>
                        <button onClick={() => handlePagination(pageNumber)}>
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployesContent;
