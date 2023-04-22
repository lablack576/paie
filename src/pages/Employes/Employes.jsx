import React from "react";
import "./Employes.css";
import Tab from "../../Components/Tab/Tab";
import EmployesContent from "./EmployesContent";

const Employes = () => {
    return <Tab content={<EmployesContent />} />;
};

export default Employes;
