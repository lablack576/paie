import React from "react";
import "./Generate.css";
import Tab from "../../Components/Tab/Tab";
import GenerateContent from "./GenerateContent";

const Generate = () => {
    return <Tab content={<GenerateContent />} />;
};

export default Generate;
