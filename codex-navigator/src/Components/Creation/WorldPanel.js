import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MDEditor from '@uiw/react-md-editor';
import {useState} from "react";
import {useAppContext} from "../../libs/Context";
import {Alert} from "react-bootstrap";

function WorldPanel() {
    const [description, setDescription] = useState("**What's so special about this world? Does it have major cities?**");
    const [name, setName] = useState("")
    const [sent, setSent] = useState(false)
    const [alertText, setAlertText] = useState("Data saved!")
    const [alertVariant, setAlertVariant] = useState("light")

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    async function create_world() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/world/v1/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body:JSON.stringify({
                name: name,
                description: description
            })
        });
        setSent(true)
        if(response.statusCode === 201){
            let data = await response.json()
            setAlertText("Data saved!")
            setAlertVariant("light")
            setTimeout(()=>{setSent(false)}, 1000)
        }
        else{
            setAlertText("Something went wrong.")
            setAlertVariant("danger")
        }


    }

    return (
        <Form>
            {sent && <Alert variant={alertVariant}>{alertText}</Alert>}

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    World Name
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" placeholder="How shall this world be remembered as?" value={name} onChange={event => {setName(event.target.value)}}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Description
                </Form.Label>
                <Col sm={10}>
                    <MDEditor
                        value={description}
                        onChange={setDescription}
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button variant="light" onClick={create_world}>Save this content</Button>
                </Col>
            </Form.Group>
        </Form>
    );
}

export default WorldPanel;