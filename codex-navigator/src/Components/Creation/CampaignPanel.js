import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MDEditor from '@uiw/react-md-editor';
import ListGroup from 'react-bootstrap/ListGroup';
import {useEffect, useState} from "react";
import {Alert, Dropdown} from "react-bootstrap";
import {CustomMenu, CustomToggle} from "../Bricks/FilterDropdown";
import {forEach} from "react-bootstrap/ElementChildren";
import {useAppContext} from "../../libs/Context";
import Style from "./CampaignPanel.module.css"
import Picker from "../Bricks/Picker";
import ListBuilder from "../Bricks/ListBuilder";
import Panel from "../Bricks/Panel";
import MultiverseBuilder from "../Bricks/MultiverseBuilder";

function CampaignPanel() {
    const [synopsis, setSynopsis] = useState("**What's the campaign's synopsis?**");
    const [retelling, setRetelling] = useState("**What happens in this campaign?**");

    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [slist, setSlist] = useState([])
    const [chosenSettings, setChosenSettings] = useState([]);

    const [ulist, setUlist] = useState([]);
    const [chosenUsers, setChosenUsers] = useState([]);

    const [clist, setClist] = useState([]);
    const [chosenChars, setChosenChars] = useState([]);

    const [campaigns, setCampaigns] = useState([]);
    const [baseCampaign, setBaseCampaign] = useState(null)

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const [sent, setSent] = useState(false)
    const [alertText, setAlertText] = useState("Data saved!")
    const [alertVariant, setAlertVariant] = useState("light")

    useEffect(() => {
        get_settings()
        get_users()
        get_characters()
        get_campaigns()
    }, [])

    useEffect(()=>{
        let items = []
        for (const char of chosenChars){
            if(!chosenUsers.includes(char.userSel)){
                items.push(char)
            }
        }
        for (const item of items){
            setChosenChars(chosenChars.filter((elem) => elem !== item))
        }
    }, [chosenUsers])

    async function get_settings() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/setting/v1/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let data = await response.json()
        setSlist(data)
        console.debug(data)
    }


    async function get_users() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/user/v1/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let data = await response.json()
        setUlist(data)
        console.debug("!!!")
        console.debug(data)
    }

    async function get_campaigns() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let data = await response.json()
        setCampaigns(data)
        console.debug(data)
    }

    async function get_characters() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/character/v1/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let data = await response.json()
        setClist(data)
        console.debug(data)
    }


    async function create_campaign() {
        console.debug(startDate)
        let base_campaign = ""
        if (baseCampaign) {
            base_campaign = baseCampaign.uid
        }
        setSent(true)
        const response = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                name: name,
                start_date: startDate,
                end_date: endDate,
                synopsis: synopsis,
                retelling: retelling,
                uid: base_campaign
            })
        });

        if (response.status === 201 || response.status === 200) {
            let data = await response.json()
            console.debug(data)
            for (const setting of chosenSettings) {
                const response = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/" + data.uid + "/setting/" + setting.uid, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                    }

                });
                if(response.status !== 201 && response.status !== 200){
                    alert("Something went wrong while processing setting "+setting.uid+".")
                }
            }

            for (const char of chosenChars) {
                const response = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/" + data.uid + "/character/" + char.selection.uid, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                    },
                    body: JSON.stringify({
                        content: char.content
                    })
                });
                if(response.status !== 201 && response.status !== 200){
                    alert("Something went wrong while processing character "+char.selection.uid + " "+ char.selection.name+".")
                }
                const response2 = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/" + data.uid + "/user/" + char.userSel.uid + "/" + char.selection.uid, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                    },
                });
                if(response.status !== 201 && response.status !== 200){
                    alert("Something went wrong while processing user "+char.userSel.uid+".")
                }
            }

            setAlertText("Data saved!")
            setAlertVariant("light")
            setTimeout(() => {
                setSent(false)
            }, 4000)
        } else {
            setAlertText("Something went wrong.")
            setAlertVariant("danger")
        }
    }


    return (
        <div>
            {sent && <Alert variant={alertVariant}>{alertText}</Alert>}

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

                    <Form.Group>
                        <p>Is this campaign a sequel? If so, choose the campaign from here.</p>
                        <Picker list={campaigns} value={baseCampaign} setValue={setBaseCampaign}
                                representer={"name"}
                                onover_field={"synopsis"}/>
                    </Form.Group>
                    <br/>
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
                <Panel>
                    <h4>Settings</h4>
                    <p>When does this campaign take place? If it involves character from different places of the
                        multiverse,
                        you may want to add more than one setting...</p>
                    <ListBuilder source_list={slist} representer={"uid"} onover_field={"description"}
                                 selectedList={chosenSettings} setSelectedList={setChosenSettings}/>
                </Panel>
                <Panel>
                    <h4>Members of the campaign</h4>
                    <p>Which players had a role in this campaign?</p>
                    <ListBuilder source_list={ulist} representer={"username"} onover_field={"email"}
                                 selectedList={chosenUsers} setSelectedList={setChosenUsers}/>
                </Panel>
                <Panel>
                    <h4>Characters</h4>
                    <p>Which characters appear in this campaign?</p>
                    <MultiverseBuilder selectedList={chosenChars} setSelectedList={setChosenChars}
                                       representer={"pg_name"} users={chosenUsers}/>
                </Panel>
                <Button variant="light" onClick={create_campaign}>Save this content</Button>

            </div>
        </div>
    );
}

export default CampaignPanel;