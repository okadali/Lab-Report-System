import {useState,useEffect,useRef} from "react";
import { useGlobalContext } from "../context";
import { DeleteWithoutAuth,GetWithoutAuth } from "../services/HttpService";


export default function Report({report}) {
    const isInitialMount = useRef(true);
    const {reportList,setReportList,refresh,setRefresh} = useGlobalContext();
    const onDeleteClick = () => {
        DeleteWithoutAuth("/reports","/"+report.id);
        setRefresh(true);
    }

    const refreshReports = () => {  
        GetWithoutAuth("/reports")
        .then(
            (result) => {
                setReportList(result)
            },
            (error) => {
                console.log(error);
            }
        )
        setRefresh(false);
    }

    useEffect(() => {
        if(isInitialMount.current)
            isInitialMount.current = false;
        else 
            refreshReports();
    },[refresh])




    return <div>
        {
        report.id+" "+
        report.name+" "+
        report.surname+" "+
        report.tcId+" "+
        report.diagnosisTitle+" "+
        report.diagnosisDetail+" "+
        report.dob
        }
        <button onClick={onDeleteClick}>delete</button>
    </div>
}

