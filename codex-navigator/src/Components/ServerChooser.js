import {Button, Form, Row} from "react-bootstrap";
import Style from "./ServerChooser.module.css";
import BreakPanel from "./Bricks/BreakPanel";
import {useState} from "react";

export default function ServerChooser(p) {

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return
        }
        setValidated(true);
    };

    return (
        <BreakPanel>
            <Form noValidate validated={validated}>
                <Row className="align-items-center">
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                        Name
                    </Form.Label>
                    <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="https://"
                    />
                </Row>
                <Row className="align-items-center">
                    <Button variant="light" className="mb-2" onClick={handleSubmit}>
                        Attempt connection
                    </Button>
                </Row>
            </Form>
        </BreakPanel>
    )
}