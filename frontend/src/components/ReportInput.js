import { useState, useEffect } from "react";
import { PostWithoutAuth } from "../services/HttpService";

export default function ReportInput() {
    const [reportData,setReportData] = useState({
        id: "",
        name: "",
        surname: "",
        tcId: "",
        diagnosisTitle: "",
        diagnosisDetail: "",
        dob: "",
        laboratorianId: ""
    });
    const handleInputChange = (e) => {
        setReportData({
            ...reportData,
            [e.target.name]:e.target.value
        })
        console.log(reportData);
    }

    const handleCreateReport = () => { 
        try {
            PostWithoutAuth("/reports",reportData)
        } catch(e) {
            
        }
    }

    

    return <div className="reportInputs">
        <input type="number" min={0} placeholder='ID' value={reportData["id"]} name={"id"} onChange={handleInputChange}/>
        <input type="text" placeholder='Name' name={"name"} onChange={handleInputChange}/>
        <input type="text" placeholder='Surname' name={"surname"} onChange={handleInputChange} />
        <input type="number" minLength={11} maxLength={11} placeholder={'T. C. ID Number'} name={"tcId"} onChange={handleInputChange}/>
        <input type="number" placeholder='Laboratorian ID' name={"laboratorianId"} onChange={handleInputChange}/>
        <input type="text" placeholder='Diagnosis Title' name={"diagnosisTitle"} onChange={handleInputChange}/>
        <textarea maxLength={200} placeholder='Diagnosis Description' name={"diagnosisDetail"} onChange={handleInputChange}/>
        <input type="date" name={"dob"} onChange={handleInputChange}/>
        <button onClick={handleCreateReport}>Create a Report</button>
    </div>
} 

