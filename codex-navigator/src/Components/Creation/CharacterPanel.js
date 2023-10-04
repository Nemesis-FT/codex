import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MDEditor from '@uiw/react-md-editor';
import {useEffect, useState} from "react";
import {useAppContext} from "../../libs/Context";
import {Accordion, Alert} from "react-bootstrap";
import Panel from "../Bricks/Panel";
import MultiverseExplorer from "../Bricks/MultiverseExplorer";
import Picker from "../Bricks/Picker";
import Style from "./CampaignPanel.module.css"

function CharacterPanel() {
    const [backstory, setBackstory] = useState("**What's this character's backstory?**");
    const [name, setName] = useState("")
    const [race, setRace] = useState("")
    const [levels, setLevels] = useState("")
    const [alive, setAlive] = useState(true)
    const [baseChar, setBaseChar] = useState(null)

    const [users, setUsers] = useState([])
    const [owner, setOwner] = useState(null)

    const [sent, setSent] = useState(false)
    const [alertText, setAlertText] = useState("Data saved!")
    const [alertVariant, setAlertVariant] = useState("light")

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    useEffect(() => {
        get_users()
    }, [])

    async function get_users() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/user/v1/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let data = await response.json()
        setUsers(data)
        console.debug(data)
    }

    async function create_character() {
        let b_id = ""
        let o_over = ""
        if(baseChar){
            b_id = baseChar.uid
        }
        if(owner){
            o_over = owner.uid
        }
        const response = await fetch(window.location.protocol + "//" + address + "/api/character/v1/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                name: name,
                race: race,
                levels: levels,
                backstory: backstory,
                alive: alive,
                based_on_id: b_id,
                owner_override: o_over
            })
        });
        setSent(true)
        if (response.status === 201 || response.status === 200) {
            let data = await response.json()
            setAlertText("Data saved!")
            setAlertVariant("light")
            setTimeout(() => {
                setSent(false)
            }, 1000)
        } else {
            setAlertText("Something went wrong.")
            setAlertVariant("danger")
        }


    }

    return (
        <div className={Style.Scrollable}>
            <h4>Basic information</h4>
            <Form>
                {sent && <Alert variant={alertVariant}>{alertText}</Alert>}

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Character Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="How shall this character be remembered as?" value={name}
                                      onChange={event => {
                                          setName(event.target.value)
                                      }}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Race
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="What's this character race?" value={race}
                                      onChange={event => {
                                          setRace(event.target.value)
                                      }}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Levels
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Which are its levels?" value={levels}
                                      onChange={event => {
                                          setLevels(event.target.value)
                                      }}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Is it still alive?
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check type="checkbox" checked={alive} onChange={event => {
                            setAlive(!alive)
                        }}/>
                    </Col>
                </Form.Group>


            </Form>
            <Panel>
                <h4>Additional information</h4>
                <p>If this character is a variation or an evolution of another character, please expand and compile the
                    following section.</p>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Multiverse Explorer</Accordion.Header>
                        <Accordion.Body>
                            <MultiverseExplorer savefun={setBaseChar}/>
                            {baseChar &&
                            <Panel>You have chosen {baseChar.name} as your base character for this one.
                                <a href="#" onClick={event => {
                                    setBaseChar(null)
                                }}>Click here to undo this choice.</a></Panel>}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <br/>
                <p>If this character is a variation or an evolution of another character, just add new backstory
                    elements.</p>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Backstory
                        </Form.Label>
                        <Col sm={10}>
                            <MDEditor
                                value={backstory}
                                onChange={setBackstory}
                            />
                        </Col>
                    </Form.Group>
                </Form>

                <p>If you're creating this character for another user, you can override ownership here. If not, leave
                    things as they are.</p>
                <Picker list={users} value={owner} setValue={setOwner} representer={"username"} onover_field={"email"}/>
                {owner && <Panel>
                    You have chosen {owner.username} as the owner.
                    <a href="#" onClick={event => {
                        setOwner(null)
                    }}>Click here to undo this choice.</a>
                </Panel>}

            </Panel>
            <Button variant="light" onClick={create_character}>Save this content</Button>
        </div>
    );
}

export default CharacterPanel;