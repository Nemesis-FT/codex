import {Alert, Button, Form, Row} from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Style from "./ServerChooser.module.css";
import BreakPanel from "./Bricks/BreakPanel";
import {useState} from "react";
import {useAppContext} from "../libs/Context";
import {useNavigate} from "react-router-dom";

export default function ServerChooser(p) {

    const [validated, setValidated] = useState(false);
    const {address, setAddress} = useAppContext()
    const [addr, setAddr] = useState("");
    const [variant, setVariant] = useState("light")
    const [text, setText] = useState("Please enter your codex backend instance.")
    const [buttonText, setButtonText] = useState("Attempt connection")

    const navigator = useNavigate()

    async function handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return
        }
        if(validated){
            setAddress(addr)
            localStorage.setItem("address", addr)
            navigator("/srv/login")
            return
        }
        try{
            const response = await fetch(`${window.location.protocol}//${addr}/api/server/v1/planetarium`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                let values = await response.json()
                setValidated(true);
                setVariant("success")
                setText("Found "+values.type+" version "+values.version+". Ready to connect.")
                setButtonText("Connect")
            }
            else{
                setValidated(false)
                setVariant("danger")
                setText("Server at address "+addr+" is unreachable.")
            }
        }
        catch (e) {
            setValidated(false)
            setVariant("danger")
            setText("Server at address "+addr+" is unreachable.")
        }


    };

    return (
        <BreakPanel>
            <Alert key={variant} variant={variant}>
                {text}
            </Alert>
            <Form noValidate validated={validated} className={Style.FormChooser}>
                <Row className="align-items-center">
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="codex.domain.tld"
                            value={addr}
                            onChange={event => setAddr(event.target.value)}
                            required
                        />
                </Row>
                <Row className="align-items-center">
                    <Button variant="light" className="mb-2" onClick={handleSubmit}>
                        {buttonText}
                    </Button>
                </Row>
            </Form>
        </BreakPanel>
    )
}