import { useState } from "react";
import { useGlobalContext } from "../context";
import { DeleteWithoutAuth, PostWithoutAuth, PutWithoutAuth } from "../services/HttpService";
import convertBase64 from "../functions/globalFunctions";
import deleteLogo from "../assets/delete.png"
import editLogo from "../assets/edit.png"


export default function Report({ report }) {
  const {setRefresh, editableReportId, setEditableReportId} = useGlobalContext();
  const [editData,setEditData] = useState({
    name: "",
    surname: "",
    tcId: "",
    diagnosisTitle: "",
    diagnosisDetail: "",
    dob: "",
    image: ""
  });
  
  
  const onDeleteClick = () => {
    DeleteWithoutAuth("/reports", "/" + report.id)
    setRefresh(true);
  };
  const onEditClick = () => {
    if(editableReportId === report.id) {
      setEditableReportId();
    }
    else {
      setEditableReportId(report.id);
      setEditData({
        ...editData,
        name : report.name,
        surname : report.surname,
        tcId : report.tcId,
        diagnosisTitle : report.diagnosisTitle,
        diagnosisDetail : report.diagnosisDetail,
        dob : report.dob,
        image:report.image
      })
    }
  }
  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setEditData({
      ...editData,
      image: base64,
    });  
  }
  const onChangeClick = async () => {
    // PostWithoutAuth("/reports/"+report.id,reportImageUpdate)
    // PutWithoutAuth(`/reports/${report.id}?name=${editData.name}&surname=${editData.surname}&tcId=${editData.tcId}&diagnosisTitle=${editData.diagnosisTitle}&diagnosisDetail=${editData.diagnosisDetail}&dob=${editData.dob}`)
    PutWithoutAuth("/reports/"+report.id,editData);
    setRefresh(true);
    setEditableReportId();
  }

  return <div>
    <div className="reportDiv" >
      <div style={{width:"50px"}}><span>{report.id}</span></div>
      <div style={{width:"120px"}}><span>{report.name}</span></div>
      <div style={{width:"100px"}}><span>{report.surname}</span></div>
      <div style={{width:"120px"}}><span>{report.tcId}</span></div>
      <div style={{width:"120px"}}><span>{report.diagnosisTitle}</span></div>
      <div style={{width:"120px"}}><span>{report.diagnosisDetail}</span></div>
      <div style={{width:"120px"}}><span>{report.dob}</span></div>
      <div style={{width:"70px"}}><span><img src={report.image} alt=""/></span></div>
      <div style={{width:"70px"}}><span>{report.laboratorian.id}</span></div>
      <div style={{width:"120px"}}><span>{report.laboratorian.name}</span></div>
      <div style={{width:"100px"}}><span>{report.laboratorian.surname}</span></div>
      <img src={editLogo} alt="" onClick={onEditClick} style={{marginLeft:"35px"}} />
      <img src={deleteLogo} alt="" onClick={onDeleteClick} />
    </div>

    {editableReportId === report.id &&
    <div className="editDiv">
      <input type="text" name="name" style={{width:"90px",marginLeft:"60px"}} value={editData.name} onChange={handleInputChange}/>
      <input type="text" name="surname" style={{width:"80px",marginLeft:"15px"}} value={editData.surname} onChange={handleInputChange}/>
      <input type="text" name="tcId" style={{width:"90px",marginLeft:"10px"}} value={editData.tcId} onChange={handleInputChange}/>
      <input type="text" name="diagnosisTitle" style={{width:"90px",marginLeft:"20px"}} value={editData.diagnosisTitle} onChange={handleInputChange}/>
      <textarea maxLength={200} name="diagnosisDetail" style={{maxWidth:"100px",marginLeft:"15px"}} value={editData.diagnosisDetail} onChange={handleInputChange}/>
      <input type="date" name="dob" style={{width:"90px",marginLeft:"15px"}} value={editData.dob} onChange={handleInputChange}/>
      <input type="file" accept="image/png, image/jpeg" onChange={handleFileInputChange}/>
      <button style={{height:"20px",marginLeft:"220px",marginTop:"30px"}} onClick={onChangeClick}>change info</button>
    </div>
    } 
  </div>
}
