import React, {useEffect, useState} from 'react';
import {useAppContext} from "../libs/Context";
import {useNavigate} from "react-router-dom";
import Navi from "./Navi";
import Panel from "./Bricks/Panel";
import Box from "./Bricks/Box";
import Jumbotron from "./Bricks/Jumbotron";
import ServerChooser from "./ServerChooser";

export default function Home() {
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const navigator = useNavigate()
    const {userData, setUserData} = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
            navigate("/srv/login")
        }
        if (address === "") {
            navigate("/")
        }
        if(!userData && address){
            getUserData()
        }
    }, [token, address])

    async function getUserData(){
        const response = await fetch(window.location.protocol + "//" + address + "/api/user/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let data = await response.json()
        setUserData(data);
        console.debug(data)
    }

    if(userData){
        return (
            <div>
                <Jumbotron title={"Welcome back, "+userData.user.username}>
                    <p>This is your dashboard.</p>
                </Jumbotron>
            </div>

        );
    }
    return (<Panel>Please wait while we roll [History] on your user id...</Panel>)
}