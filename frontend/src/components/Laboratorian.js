import {useState,useEffect} from "react";


export default function Laboratorian({laboratorian}) {
    return <div className="reportDiv" style={{height:"25px"}}>
        <div style={{width:"80px"}}><span>{laboratorian.id}</span></div>
        <div style={{width:"120px"}}><span>{laboratorian.name}</span></div>
        <div style={{width:"100px"}}><span>{laboratorian.surname}</span></div>
        <div style={{width:"50px"}}><span>{laboratorian.userType ? "Admin" : "User"}</span></div>
    </div>
}   