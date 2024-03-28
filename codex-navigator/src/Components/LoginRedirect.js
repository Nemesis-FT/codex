import {useNavigate, useParams} from "react-router-dom";
import {useAppContext} from "../libs/Context";
import {useEffect} from "react";

export default function LoginRedirect(){
    let {addr} = useParams()
    let {tok} = useParams()
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const navigate = useNavigate()
    useEffect(()=>{
        if(addr==null){
            return;
        }
        localStorage.setItem("address", addr)
        setAddress(addr)
        setToken(tok)
        console.debug("TOKEN"+tok)
        sessionStorage.setItem("jwt", tok)
        navigate("/srv/home")
    }, [addr])

    return (<div>Please wait, attempting to redirect...</div>)
}