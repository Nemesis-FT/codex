import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MDEditor from '@uiw/react-md-editor';
import {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";
import {CustomMenu, CustomToggle} from "../Bricks/FilterDropdown";
import {forEach} from "react-bootstrap/ElementChildren";
import {useAppContext} from "../../libs/Context";

function SettingPanel() {
    const [description, setDescription] = useState("**What's happening in this setting?**");
    const [wlist, setWlist] = useState([])
    const [selWorld, setSelWorld] = useState(null)
    const [timeframe, setTimeframe] = useState("")

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    useEffect(() => {
        get_worlds()
    }, [])

    async function set_world(id) {
        wlist.forEach(elem => {
            if (elem.uid === id) {
                setSelWorld(elem)
                console.debug(elem)
            }
        })

    }

    async function get_worlds() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/world/v1/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let data = await response.json()
        setWlist(data)
    }

    async function create_setting() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/setting/v1/" + selWorld.uid, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                timeframe: timeframe,
                description: description
            })
        });
        let data = await response.json()
    }

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    World
                </Form.Label>
                <Col sm={10}>
                    <Dropdown onSelect={event => {
                        set_world(event)
                    }}>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            {selWorld && <>{selWorld.name}</>}
                            {!selWorld && <>Choose a world...</>}
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            {wlist.map(elem => <Dropdown.Item eventKey={elem.uid}
                                                              key={elem.uid}>{elem.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <p></p>
                    {selWorld && <MDEditor.Markdown source={selWorld.description} style={{whiteSpace: 'pre-wrap'}}/>}
                </Col>

            </Form.Group>
            {selWorld && <div>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Time frame
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="When are these events happening?" value={timeframe}
                                      onChange={event => {
                                          setTimeframe(event.target.value)
                                      }}/>
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
                    <Col sm={{span: 10, offset: 2}}>
                        <Button variant="light" onClick={create_setting}>Save this content</Button>
                    </Col>
                </Form.Group></div>}
        </Form>
    );
}

export default SettingPanel;