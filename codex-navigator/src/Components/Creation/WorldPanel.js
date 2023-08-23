import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MDEditor from '@uiw/react-md-editor';
import {useState} from "react";
import {useAppContext} from "../../libs/Context";

function WorldPanel() {
    const [description, setDescription] = useState("**What's so special about this world? Does it have major cities?**");
    const [name, setName] = useState("")

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
        let data = await response.json()

    }

    return (
        <Form>
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