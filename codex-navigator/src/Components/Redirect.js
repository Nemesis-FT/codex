import {useNavigate, useParams} from "react-router-dom";
import {useAppContext} from "../libs/Context";
import {useEffect} from "react";

export default function Redirect(){
    let {addr} = useParams()
    const {address, setAddress} = useAppContext()
    const navigate = useNavigate()
    useEffect(()=>{
        if(addr==null){
            return;
        }
        localStorage.setItem("address", addr)
        setAddress(addr)
        navigate("/srv/login")
    }, [addr])

    return (<div>Please wait, attempting to redirect...</div>)
}