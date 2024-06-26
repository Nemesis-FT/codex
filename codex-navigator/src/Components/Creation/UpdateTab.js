import {useState} from 'react';
import Panel from "../Bricks/Panel";
import {Dropdown, Row, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Style from "./Creation.module.css"
import CreationRouter from "./CreationRouter";
import Form from "react-bootstrap/Form";
import {useAppContext} from "../../libs/Context";
import SettingPanel from "./SettingPanel";
import WorldPanel from "./WorldPanel";
import CharacterDetails from "../Explorer/Specialization/CharacterDetails";
import CharacterPanel from "./CharacterPanel";
import CampaignPanel from "./CampaignPanel";

function CreateTab() {
    const [mode, setMode] = useState("Choose something...");
    const [uuid, setUuid] = useState("")
    const [target, setTarget] = useState(null)
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const [error, setError] = useState(false)

    async function get_data(){
        setError(false)
        try{
            setTarget(null)
            const response = await fetch(window.location.protocol + "//" + address + "/api/" + mode.toLowerCase() + "/v1/"+uuid, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response.status!==200){
                throw Error
            }
            let data = await response.json()
            setTarget({type:mode.toLowerCase(), data:data})
        } catch (e) {
            setError(true)
        }

    }

    return (
        <div>

            <Row>
                <Col  xs={3}>
                    <h2>What do you want to update?</h2>
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
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Resource UUID
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="text" placeholder="Please provide the resource uuid." value={uuid}
                                          onChange={event => {
                                              setUuid(event.target.value)
                                          }}/>
                        </Col>
                        <Col>
                            <Button variant="light" onClick={get_data}>Go</Button>
                        </Col>
                        {error === true && <Panel>What you're looking for does not exist.</Panel>}
                    </Form.Group>
                    {target && <div>
                        {target.type==="setting" && <SettingPanel data={target.data}/>}
                        {target.type==="world" && <WorldPanel data={target.data}/>}
                        {target.type==="character" && <CharacterPanel data={target.data}/>}
                        {target.type==="campaign" && <CampaignPanel data={target.data}/>}
                    </div>}
                </Col>
            </Row>
        </div>
    );
}

export default CreateTab;