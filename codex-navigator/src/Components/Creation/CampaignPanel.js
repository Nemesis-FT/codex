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

function CampaignPanel(props) {
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

    const [sent, setSent] = useState(false)
    const [alertText, setAlertText] = useState("Data saved!")
    const [alertVariant, setAlertVariant] = useState("light")

    const [forbidden, setForbidden] = useState(false)
    const [ready, setReady] = useState(false)

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const {userData, setUserData} = useAppContext()


    useEffect(() => {
        get_settings().then(
            get_users().then(
                get_characters().then(
                    get_campaigns().then(handle_props().then(setReady(true))))))
    }, [])

    async function handle_props() {
        if (props.data !== undefined) {
            if (props.data.dm.uid !== userData.uid && userData.isAdmin === false) {
                setForbidden(true)
                return;
            }
            console.debug(props.data)
            setName(props.data.campaign.name)
            setStartDate(props.data.campaign.start_date)
            setEndDate(props.data.campaign.end_date)
            setSynopsis(props.data.campaign.synopsis)
            setRetelling(props.data.campaign.retelling)

            setChosenUsers(props.data.members)
            setChosenSettings(props.data.setting)
            let tmp = []
            console.debug("IMPORTING CHARS")
            props.data.happenings.forEach(chara => {
                let item = {
                    selection: chara.character,
                    userSel: chara.owner,
                    content: chara.character_history.content,
                    pg_name: chara.character.name + " - " + chara.owner.username
                }
                tmp.push(item)
            })
            console.debug("???")
            console.debug(tmp)
            setChosenChars(tmp)
        }
    }

    useEffect(() => {
        if(!ready){
            console.debug("AAA")
            return;
        }
        else{
            console.debug("!DIO")
            let items = []
            for (const char of chosenChars) {
                let isThere = false
                for (const user of chosenUsers){
                    if(user.uid === char.userSel.uid){
                        isThere = true
                    }
                }
                if (isThere) {
                    items.push(char)
                }
            }
            setChosenChars(items)
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
        setSent(true)
        setAlertText("Saving data, please wait...")
        setAlertVariant("light")
        console.debug(startDate)
        let base_campaign = ""
        if (baseCampaign) {
            base_campaign = baseCampaign.uid
        }
        let response
        if (props.data === undefined) {
            response = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/", {
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
        }
        else{
            response = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/"+props.data.campaign.uid, {
                method: "PATCH",
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
                    retelling: retelling
                })
            });
        }
        if (response.status === 201 || response.status === 200) {
            let data = await response.json()
            console.debug(data)
            if(props.data !== undefined){
                response = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/"+props.data.campaign.uid+"/clear", {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                    },
                });
            }
            for (const setting of chosenSettings) {
                const response = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/" + data.uid + "/setting/" + setting.uid, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                    }

                });
                if (response.status !== 201 && response.status !== 200) {
                    alert("Something went wrong while processing setting " + setting.uid + ".")
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
                if (response.status !== 201 && response.status !== 200) {
                    alert("Something went wrong while processing character " + char.selection.uid + " " + char.selection.name + ".")
                }
                const response2 = await fetch(window.location.protocol + "//" + address + "/api/campaign/v1/" + data.uid + "/user/" + char.userSel.uid + "/" + char.selection.uid, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                    },
                });
                if (response.status !== 201 && response.status !== 200) {
                    alert("Something went wrong while processing user " + char.userSel.uid + ".")
                }
            }
            setSent(true)
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

    if (!ready) {
        return <div><h3>Loading...</h3></div>
    }

    if (forbidden) {
        return <div><h3>You lack the authorization to edit this content.</h3></div>
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
                {sent && <Alert variant={alertVariant}>{alertText}</Alert>}
                <Button variant="light" onClick={create_campaign}>Save this content</Button>

            </div>
        </div>
    );
}

export default CampaignPanel;