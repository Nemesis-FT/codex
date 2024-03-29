import React, {useEffect, useState} from 'react';
import {useAppContext} from "../libs/Context";
import {useNavigate} from "react-router-dom";
import Navi from "./Navi";
import Panel from "./Bricks/Panel";
import Box from "./Bricks/Box";
import Jumbotron from "./Bricks/Jumbotron";
import ServerChooser from "./ServerChooser";
import Col from "react-bootstrap/Col";
import {Button, Row} from "react-bootstrap";
import DashboardTabs from "./DashboardTabs";
import ExploreTab from "./Explorer/ExploreTab";

export default function Home() {
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const navigator = useNavigate()
    const {userData, setUserData} = useAppContext()
    const navigate = useNavigate()
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (address === "") {
            navigate("/")
        }
        if (!userData && address) {
            if(token){
                getUserData().then(setDone(true))
            }
            else{
                setDone(true)
            }

        }
    }, [token, address])

    async function getUserData() {
        try{
            const response = await fetch(window.location.protocol + "//" + address + "/api/user/v1/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            let data = await response.json()
            setUserData(data);
            console.debug(data)
        }
        catch (e) {
            sessionStorage.removeItem("jwt")
            setToken(null)
            setUserData(null)
        }

    }

    if(!done){
        return (<Panel>Please wait while we roll to load this content...</Panel>)
    }

    if (userData) {
        return (
            <div>
                <Jumbotron title={"Welcome back, " + userData.user.username}>

                </Jumbotron>
                <DashboardTabs/>
            </div>

        );
    }
    else if (token===null){
        return (<div>
            <Jumbotron title={"Welcome to this codex instance!"}>
                <p> Since you're not logged in, you can only inspect the contents of this instance. Creating and editing content are actions reserved only to authorized users.</p>
                <p> In order to do more, please <a href="#" onClick={event => {navigate("/srv/login")}}> log in </a> with your credentials. </p>
            </Jumbotron>
            <ExploreTab/>
        </div>)
    }
    else{
        return (<Panel>Please wait while we roll [History] on your user id...</Panel>)
    }


}