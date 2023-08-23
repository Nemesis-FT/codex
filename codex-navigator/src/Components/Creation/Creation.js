import {useState} from 'react';
import Panel from "../Bricks/Panel";
import {Dropdown, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Style from "./Creation.module.css"
import CreationRouter from "./CreationRouter";

function CreateTab() {
    const [mode, setMode] = useState("Choose something...");

    return (
        <div>

            <Row>
                <Col  xs={3}>
                    <h2>What do you want to create?</h2>
                    <Dropdown data-bs-theme="dark"
                              onSelect={event => {
                                  setMode(event)
                              }}>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" className={Style.DropDownFill}>
                            {mode}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={Style.DropDownFill}>
                            <Dropdown.Item eventKey="World">World</Dropdown.Item>
                            <Dropdown.Item eventKey="Setting">Setting</Dropdown.Item>
                            <Dropdown.Item eventKey="Campaign">Campaign</Dropdown.Item>
                            <Dropdown.Item eventKey="Character">Character</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <CreationRouter mode={mode}/>
                </Col>
            </Row>
        </div>
    );
}

export default CreateTab;