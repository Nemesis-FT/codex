import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MDEditor from '@uiw/react-md-editor';
import {useState} from "react";
import {useAppContext} from "../../libs/Context";
import {Accordion, Alert} from "react-bootstrap";
import Panel from "../Bricks/Panel";
import MultiverseExplorer from "./MultiverseExplorer";

function CharacterPanel() {
    const [backstory, setBackstory] = useState("**What's this character's backstory?**");
    const [name, setName] = useState("")
    const [race, setRace] = useState("")
    const [levels, setLevels] = useState("")
    const [alive, setAlive] = useState(true)
    const [baseChar, setBaseChar] = useState(null)

    const [sent, setSent] = useState(false)
    const [alertText, setAlertText] = useState("Data saved!")
    const [alertVariant, setAlertVariant] = useState("light")

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    async function create_character() {
        const response = await fetch(window.location.protocol + "//" + address + "/api/world/v1/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
            body: JSON.stringify({
                name: name,
                description: backstory
            })
        });
        setSent(true)
        if (response.statusCode === 201) {
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
        <div>
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
                        Is he alive?
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
                <p>If this character is a variation or an evolution of another character, please expand and compile the following section.</p>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Multiverse Explorer</Accordion.Header>
                        <Accordion.Body>
                            <MultiverseExplorer savefun={setBaseChar}/>
                            { baseChar &&
                            <Panel>You have chosen {baseChar.name} as your base character for this one.</Panel> }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <br/>
                <p>If this character is a variation or an evolution of another character, just add new backstory elements.</p>
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
            </Panel>
            <Form.Group as={Row} className="mb-3">
                <Col sm={{span: 10, offset: 2}}>
                    <Button variant="light" onClick={create_character}>Save this content</Button>
                </Col>
            </Form.Group>
        </div>
    );
}

export default CharacterPanel;