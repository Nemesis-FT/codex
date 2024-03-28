import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../libs/Context";
import {schema} from "../env";
import Style from "./Login.module.css"
import Panel from "./Bricks/Panel";
import {Alert, Button, Form} from "react-bootstrap";

export default function Login() {
    const {token, setToken} = useAppContext()
    const {address, setAddress} = useAppContext()
    const [server, setServer] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validated, setValidated] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        if (address === "" || address == null) {
            navigate("/")
            return;
        }
        // if(token!==null){
        //     navigate("/srv/home")
        //     return;
        // }
        window.open(schema+address+"/oauth2/AuthMaster/authorize", "_self")
    }, [address, token])


    return (
        <div>
            Please wait, now redirecting...
        </div>
    )
}