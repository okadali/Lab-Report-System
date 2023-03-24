import {useState,useEffect} from "react";


export default function Laboratorian({laboratorian}) {
    return <div className="laboratorianDiv">
        {
        laboratorian.id+" "+
        laboratorian.name+" "+
        laboratorian.surname+" "+
        (laboratorian.userType ? "Admin" : "User")
        }
    </div>
}