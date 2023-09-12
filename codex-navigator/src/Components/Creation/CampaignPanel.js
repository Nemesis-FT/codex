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
import Style from "./CampaignPanel.module.css"
import Picker from "../Bricks/Picker";

function CampaignPanel() {
    const [synopsis, setSynopsis] = useState("**What's the campaign's synopsis?**");
    const [retelling, setRetelling] = useState("**What happens in this campaign?**");
    const [slist, setSlist] = useState([])
    const [selSetting, setSelSetting] = useState(null)
    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    useEffect(() => {
        get_settings()
    }, [])

    async function set_world(id) {


    }

    async function get_settings() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/setting/v1/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let data = await response.json()
        setSlist(data)
    }

    async function create_setting() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/setting/v1/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                timeframe: name,
                description: synopsis
            })
        });
        let data = await response.json()
    }

    return (
        <div className={Style.Scrollable}>
            <h3>General information</h3>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="What's the name of the campaign?" value={name}
                                      onChange={event => {
                                          setName(event.target.value)
                                      }}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Start/End Date
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="date" value={startDate}
                                      onChange={event => {
                                          setStartDate(event.target.value)
                                      }}/>
                    </Col>
                    <Col sm={5}>
                        <Form.Control type="date" value={endDate}
                                      onChange={event => {
                                          setEndDate(event.target.value)
                                      }}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Synopsis
                    </Form.Label>
                    <Col sm={10}>
                        <MDEditor
                            value={synopsis}
                            onChange={setSynopsis}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Retelling
                    </Form.Label>
                    <Col sm={10}>
                        <MDEditor
                            value={retelling}
                            onChange={setRetelling}
                        />
                    </Col>
                </Form.Group>


            </Form>
            <h3>Additional information</h3>
            <Row>
                <Col>
                    <h4>Settings</h4>
                    <Row>
                        <Col>
                            <Picker list={slist} value={selSetting} setValue={setSelSetting}/>
                        </Col>
                        <Col>
                            <Button variant="light" onClick={create_setting}>+</Button>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <h4>Members of the campaign</h4>
                </Col>
                <Col>
                    <h4>Characters</h4>
                </Col>

            </Row>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{span: 10, offset: 2}}>
                        <Button variant="light" onClick={create_setting}>Save this content</Button>
                    </Col>
                </Form.Group>
            </Form>

        </div>
    );
}

export default CampaignPanel;