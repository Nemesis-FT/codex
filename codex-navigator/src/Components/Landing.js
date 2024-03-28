import React, {useEffect, useState} from 'react';
import {useAppContext} from "../libs/Context";
import {useNavigate} from "react-router-dom";
import Navi from "./Navi";
import Panel from "./Bricks/Panel";
import Box from "./Bricks/Box";
import Jumbotron from "./Bricks/Jumbotron";
import ServerChooser from "./ServerChooser";

export default function Landing() {
    const {address, setAddress} = useAppContext()
    const navigator = useNavigate()
    const [addr, setAddr] = useState("");

    useEffect(() => {
        if (localStorage.getItem("address") && address == null) {
            let address = localStorage.getItem("address")
            setAddress(address)
            navigator("/srv/home")
        }
    })

    async function conn() {
        try {
            const response = await fetch(`${window.location.protocol}//${addr}/api/server/v1/planetarium`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                let values = await response.json()
                setAddress(addr)
                localStorage.setItem("address", addr)
                navigator("/srv/login")
            } else {
                alert("No instance running at address.")
            }
        } catch (e) {
            alert(`Couldn't send request to address: ${e}`)
        }
    }

    return (
        <div>
            <Jumbotron title={"Welcome on Codex, adventurer."}>
                <p>
                    Codex is a web application that allows the management of your dnd characters, campaigns and
                    narrative worlds.
                    Its a powerful tool that aims at preserving campaign and character histories, and keeping track of
                    different world states.
                </p>
                <p>
                    Alternate realities? Bring them on. Characters in sequels? No problem. There's not a scenario this
                    tool can't cover.
                    To get started, you will need to host a backend instance on a server, and you can connect to yours
                    using the handy form below.
                </p>
            </Jumbotron>
            <ServerChooser/>
        </div>

    );
}