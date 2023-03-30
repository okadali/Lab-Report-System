import { useState } from "react";
import { PostWithoutAuth } from "../services/HttpService";
import { useGlobalContext } from "../context";

export default function LaboratorianInput() {
    const {setRefresh,laboratorianList,setError} = useGlobalContext();
    const [laboratorianData,setLaboratorianData] = useState({
        id: "",
        name: "",
        surname: "",
        userType: "" //0 user - 1 admin
    });
    const handleInputChange = (e) => {
        setLaboratorianData({
            ...laboratorianData,
            [e.target.name]:e.target.value
        })
    }
    const handleCreateLaboratorian = () => {
        let errorBool = true;
        setError("");

        if(laboratorianData.id === "") {setError("lab. id cannot be empty");errorBool=false;}
        else {
            let isExists = false;
            laboratorianList.forEach(laboratorian => {
                if(laboratorian.id == laboratorianData.id) {isExists = true;}
            })

            if(laboratorianData.id.length !== 7) {setError("lab. id must be 7 characters"); errorBool=false;}
            if(isExists) {setError("lab. id already exists"); errorBool=false;}
            
        }
        if(laboratorianData.name === "") {setError("lab. name cannot be empty");errorBool=false;}
        if(laboratorianData.surname === "") {setError("lab. surname cannot be empty");errorBool=false;}

        if(errorBool) {
            PostWithoutAuth("/laboratorians",laboratorianData)
            setRefresh(true)
        }
    }

    return <div className="reportInputs">
        <input type="number" min={0} placeholder='ID (7 digit)' name={"id"} onChange={handleInputChange}/>
        <input type="text" placeholder='Name' name={"name"} onChange={handleInputChange}/>
        <input type="text" placeholder='Surname' name={"surname"} onChange={handleInputChange}/>
        <div style={{margin: "5px",textAlign: "center"}}>
            <label htmlFor="userTypeChoice1">User</label>
            <input type="radio" id="userTypeChoice1" value="0" name="userType" onChange={handleInputChange} />
            <label htmlFor="userTypeChoice2">Admin</label>
            <input type="radio" id="userTypeChoice2" value="1" name="userType" onChange={handleInputChange} />
        </div>
        
        <button onClick={handleCreateLaboratorian}>Create a Laboratorian</button>
    </div>
}