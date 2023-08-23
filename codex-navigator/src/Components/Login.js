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
        if (address === "") {
            navigate("/")
        }
        if(token!==null){
            navigate("/srv/home")
        }

    }, [address, token])

    useEffect(() => {
        if (localStorage.getItem("address")) {
            if (address === null) {
                let address = localStorage.getItem("address")
                console.debug(address)
                setAddress(address)
            }
            get_server_data(address)
        }
    }, [isAuthenticated])

    async function login() {

        var details = {
            "grant_type": "password",
            "username": email,
            "password": password
        }
        var formB = []
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formB.push(encodedKey + "=" + encodedValue);
        }
        formB = formB.join("&");
        try {
            const response = await fetch(schema + address + "/token", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: formB
            });
            if (response.status === 200) {
                let values = await response.json()
                setToken(values.access_token)
                setValidated(true)
                sessionStorage.setItem("jwt", values.access_token)
            } else {
                setValidated(false)
            }
        } catch {
            setValidated(false)
        }

    }

    async function get_server_data(address) {
        if (address == null) {
            return;
        }
        console.debug(address)
        try {
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
        } catch (e) {
        }
    }

    return (
        <div className={Style.LoginBox}>
            <Panel>
                <Alert variant="dark">
                    Please enter your credentials to access this instance.
                </Alert>
                <Form noValidate validated={validated}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                                      onChange={event => setEmail(event.target.value)} required isInvalid={!validated}/>
                        <Form.Control.Feedback type="invalid">
                            The combination of email and password are not recognized by the backend.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                                      onChange={event => setPassword(event.target.value)} required isInvalid={!validated}/>
                    </Form.Group>

                    <Button variant="light" onClick={event => login()}>
                        Login
                    </Button>
                </Form>
            </Panel>
        </div>
    )
}