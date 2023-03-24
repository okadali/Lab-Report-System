import { useState } from "react";
import { PostWithoutAuth } from "../services/HttpService";
import { useGlobalContext } from "../context";

export default function LaboratorianInput() {
    const {setRefresh} = useGlobalContext();
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
        PostWithoutAuth("/laboratorians",laboratorianData)
        setRefresh(true)
    }

    return <div className="reportInputs">
        <input type="number" min={0} placeholder='ID' name={"id"} onChange={handleInputChange}/>
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