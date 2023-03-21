import {useState,useEffect} from "react";


export default function Laboratorian({laboratorian}) {
    return <div>
        {
        laboratorian.id+" "+
        laboratorian.name+" "+
        laboratorian.surname+" "+
        laboratorian.userType
        }
    </div>
}