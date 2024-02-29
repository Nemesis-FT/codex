import {Dropdown} from "react-bootstrap";
import {CustomMenu, CustomToggle} from "./FilterDropdown";
import Style from "./Picker.module.css";
import {useEffect, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Picker from "./Picker";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";


export default function ListBuilder(props) {

    const [selection, setSelection] = useState(null)

    async function add() {

        if (props.selectedList.includes(selection)) {
            return
        }
        props.setSelectedList(props.selectedList.concat(selection))
    }

    async function remove(item) {
        props.setSelectedList(props.selectedList.filter((elem) => elem !== item))
    }

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <Picker list={props.source_list} value={selection} setValue={setSelection}
                                representer={props.representer}
                                onover_field={props.onover_field}/>
                    </Col>
                    <Col>
                        {selection &&
                            <Button variant="light" onClick={add}>Add</Button>
                        }
                    </Col>
                </Row>
            </Col>
            <Col>
                <ListGroup>
                    {props.selectedList !== undefined && <>
                        {
                            props.selectedList.map(elem =>
                                <ListGroup.Item key={elem.uid}>{elem[props.representer]} <a href="#"
                                                                                            onClick={() => remove(elem)}>Remove</a>
                                </ListGroup.Item>
                            )
                        }
                    </>
                    }
                    {props.selectedList === undefined && <p>!!!</p>}
                </ListGroup>
            </Col>

        </Row>
    )
}

