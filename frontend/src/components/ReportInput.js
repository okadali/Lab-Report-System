import { useState } from "react";
import { PostWithoutAuth } from "../services/HttpService";
import { useGlobalContext } from "../context";
import convertBase64 from "../functions/globalFunctions";


export default function ReportInput() {
    const {setRefresh,setError,constReportList,laboratorianList} = useGlobalContext();
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
        let errorBool = true;
        setError("");
        
        if(reportData.tcId.length !== 11) {setError("invalid tc id");errorBool=false;}

        if(reportData.id === "") {setError("id cannot be empty");errorBool=false;}
        else {
            constReportList.forEach(report => {
                if(report.id == reportData.id)  {setError("id already used");errorBool=false;}
            });
        }

        if(reportData.laboratorianId === "") {setError("lab. id cannot be empty");errorBool=false;}
        else {
            let isExists = false;
            laboratorianList.forEach(laboratorian => {
                if(laboratorian.id == reportData.laboratorianId) {isExists = true;}
            })
            if(!isExists) {setError("lab. id does not exists");errorBool=false;}
        }

        if(errorBool) {
            PostWithoutAuth("/reports",reportData)
            setRefresh(true)
        }
    }

    
    return <div className="reportInputs">
        <input type="number" min={0}  placeholder='ID' name={"id"} onChange={handleInputChange}/>
        <input type="text" placeholder='Name' maxLength={10} name={"name"} onChange={handleInputChange}/>
        <input type="text" placeholder='Surname' name={"surname"} maxLength={10} onChange={handleInputChange}/>
        <input type="number"  placeholder={'T. C. ID Number (11 digit)'} name={"tcId"} onChange={handleInputChange}/>
        <input type="number" placeholder='Laboratorian ID (7 digit)' name={"laboratorianId"} onChange={handleInputChange}/>
        <input type="text" placeholder='Diagnosis Title' maxLength={15} name={"diagnosisTitle"} onChange={handleInputChange}/>
        <textarea maxLength={200} placeholder='Diagnosis Description' name={"diagnosisDetail"} onChange={handleInputChange}/>
        <input type="date" name={"dob"} onChange={handleInputChange}/>
        <input type="file" accept="image/png, image/jpeg" onChange={handleFileInputChange}  />
        <button type="submit" onClick={handleCreateReport}>Create a Report</button>
    </div>
} 

