import {Dropdown} from "react-bootstrap";
import {CustomMenu, CustomToggle} from "./FilterDropdown";
import Style from "./Picker.module.css";
import {useEffect, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import MultiverseExplorer from "./MultiverseExplorer";
import ListBuilder from "./ListBuilder";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Picker from "./Picker";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Panel from "./Panel";


export default function MultiverseBuilder(props) {

    const [selection, setSelection] = useState(null)
    const [userSel, setUserSel] = useState(null)
    const [content, setContent] = useState("")

    useEffect(() => {
        setUserSel(null)
    }, [props.users])

    async function add() {
        console.debug(props.selectedList)
        let item = {
            selection: selection,
            userSel: userSel,
            content: content,
            pg_name: selection.name + " - " + userSel.username
        }
        if (props.selectedList.includes(item)) {
            return
        }
        props.setSelectedList(props.selectedList.concat(item))
        setSelection(null)
    }

    async function remove(item) {
        props.setSelectedList(props.selectedList.filter((elem) => elem !== item))
    }

    return (
        <Row>
            <Col>
                <MultiverseExplorer savefun={setSelection}/>
                {selection &&
                <Panel>You have chosen {selection.name}.
                    <a href="#" onClick={event => {
                        setSelection(null)
                    }}>
                        Click here to undo that.
                    </a>
                </Panel>}
                {selection &&
                <div>
                    <p>Who played this character?</p>
                    <Picker list={props.users} value={userSel} setValue={setUserSel} representer={"username"}
                            onover_field={"email"}/>
                    {userSel && <Panel>
                        You have chosen {userSel.username} as the player.
                        <a href="#" onClick={event => {
                            setUserSel(null)
                        }}>Click here to undo this choice.</a> </Panel>}
                    {userSel &&
                    <div>
                        <p>What happened to this character?</p>
                        <MDEditor value={content}
                                  onChange={setContent}>

                        </MDEditor>
                        <br/>
                        <Button variant="light" onClick={add}>Add</Button>
                    </div>
                    }
                </div>
                }
            </Col>
            <Col>
                <ListGroup>
                    {props.selectedList.map(elem =>
                        <ListGroup.Item key={elem.uid}>{elem[props.representer]} <a href="#"
                                                                                    onClick={() => remove(elem)}>Remove</a>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Col>

        </Row>
    )
}

