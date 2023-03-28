import { useState } from "react";
import { PostWithoutAuth } from "../services/HttpService";
import { useGlobalContext } from "../context";
import convertBase64 from "../functions/globalFunctions";


export default function ReportInput() {
    const {setRefresh} = useGlobalContext();
    const [reportData,setReportData] = useState({
        id: "",
        name: "",
        surname: "",
        tcId: "",
        diagnosisTitle: "",
        diagnosisDetail: "",
        dob: "",
        laboratorianId: "",
        image: ""
    });
    const handleInputChange = (e) => {
        setReportData({
            ...reportData,
            [e.target.name]:e.target.value
        })
        console.log(reportData);
    }
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setReportData({
            ...reportData,
            "image":base64
        })
    }
    const handleCreateReport = () => {
        PostWithoutAuth("/reports",reportData)
        setRefresh(true)
    }

    

    return <div className="reportInputs">
        <input type="number" min={0}  placeholder='ID' name={"id"} onChange={handleInputChange}/>
        <input type="text" placeholder='Name' maxLength={10} name={"name"} onChange={handleInputChange}/>
        <input type="text" placeholder='Surname' name={"surname"} maxLength={10} onChange={handleInputChange}/>
        <input type="number" minLength={11} maxLength={11} placeholder={'T. C. ID Number'} name={"tcId"} onChange={handleInputChange}/>
        <input type="number" placeholder='Laboratorian ID' name={"laboratorianId"} onChange={handleInputChange}/>
        <input type="text" placeholder='Diagnosis Title' maxLength={15} name={"diagnosisTitle"} onChange={handleInputChange}/>
        <textarea maxLength={200} placeholder='Diagnosis Description' name={"diagnosisDetail"} onChange={handleInputChange}/>
        <input type="date" name={"dob"} onChange={handleInputChange}/>
        <input type="file" accept="image/png, image/jpeg" onChange={handleFileInputChange}  />
        <button type="submit" onClick={handleCreateReport}>Create a Report</button>
        
    </div>
} 

