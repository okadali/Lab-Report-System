import { useState } from "react";
import { useGlobalContext } from "../context";

export default function ReportBar() {
    const {setRefresh,reportList,setReportList,constReportList} = useGlobalContext();
    const [searchInput,setSearchInput] = useState("");

    const onSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    }
    const onDobClick = () => {
        reportList.sort((a,b) => {
            let dateA = new Date(a.dob);
            let dateB = new Date(b.dob);
            if(dateA.getTime() < dateB.getTime()) {return -1;}
            if(dateA.getTime() > dateB.getTime()) {return 1;}
            return 0;
        })
        setReportList([
            ...reportList
        ]);
    }
    const onEnterKeyDown = (e) => {
      if (e.key === "Enter") {
        if (searchInput === "") {
          setRefresh(true);
        } else {
          setReportList(
            constReportList.filter((item) => {
              if (item.name.includes(searchInput)) return true;
              if (item.surname.includes(searchInput)) return true;
              if (item.tcId.toString().includes(searchInput)) return true;
              if (item.laboratorian.name.includes(searchInput)) return true;
              if (item.laboratorian.surname.includes(searchInput)) return true;
            })
          );
        }
      }
    };

    return <div className="reportBar">
        <div style={{width:"50px"}}><span>ID</span></div>                       
        <div style={{width:"120px"}}><span>Name</span></div>                        
        <div style={{width:"100px"}}><span>Surname</span></div>                     
        <div style={{width:"120px"}}><span>TC</span></div>                      
        <div style={{width:"120px"}}><span>D. Title</span></div>                        
        <div style={{width:"120px"}}><span>D. Detail</span></div>                       
        <div className="barDobDiv" style={{width:"120px"}} onClick={onDobClick}><span>Given Date</span></div>                        
        <div style={{width:"70px"}}><span>R. Photo</span></div>                     
        <div style={{width:"70px"}}><span>L. ID</span></div>                        
        <div style={{width:"120px"}}><span>L. Name</span></div>                     
        <div style={{width:"100px"}}><span>L. Surname</span></div>                      

        <input type="text" placeholder="search..." style={{width:"120px"}} value={searchInput} onChange={onSearchInputChange} onKeyDown={onEnterKeyDown}/>
    </div>
}