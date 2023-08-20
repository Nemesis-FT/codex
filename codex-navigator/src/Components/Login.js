import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../libs/Context";
import {schema} from "../env";

export default function Login() {
    const {token, setToken} = useAppContext()
    const {address, setAddress} = useAppContext()
    const [server, setServer] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate()

    useEffect( () => {
        if (localStorage.getItem("address") ) {
            if(address===null){
                let address = localStorage.getItem("address")
                console.debug(address)
                setAddress(address)
            }
            get_server_data(address)
        }
    }, [isAuthenticated])

    async function get_server_data(address) {
        if(address==null){
            return;
        }
        console.debug(address)
        try{
            const response = await fetch(`${window.location.protocol}//${address}/api/server/v1/planetarium`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                let values = await response.json()
                console.debug(values)
                setServer(values)
            }
        }
        catch (e) {
        }
    }

    return (
        <div>

        </div>
    )
}