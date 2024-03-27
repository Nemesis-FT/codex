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
import Form from "react-bootstrap/Form";


export default function RelationshipBuilder(props) {

    const [selection, setSelection] = useState(null)
    const [content, setContent] = useState("")

    async function add() {
        console.debug(props.selectedList)
        let item = {
            selection: selection,
            content: content,
            pg_name: selection.name
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
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={6}>
                                Relationship Type
                            </Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" placeholder="Brother" value={content}
                                              onChange={event => {
                                                  setContent(event.target.value)
                                              }}/>
                            </Col>
                        </Form.Group>
                        <Button variant="light" onClick={add}>Add</Button>
                </div>
                }
            </Col>
            <Col>
                <ListGroup>
                    {props.selectedList.map(elem =>
                        <ListGroup.Item key={elem.uid}>{elem[props.representer]} ({elem.content}) <a href="#"
                                                                                    onClick={() => remove(elem)}>Remove</a>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Col>

        </Row>
    )
}

