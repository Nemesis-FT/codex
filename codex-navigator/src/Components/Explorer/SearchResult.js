import {useAppContext} from "../../libs/Context";
import {useEffect, useState} from "react";
import {ListGroupItem} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Panel from "../Bricks/Panel";
import MDEditor from "@uiw/react-md-editor";

export default function SearchResult(props){

    const [show, setShow] = useState(false)

    return (
        <ListGroupItem onClick={event => {event.preventDefault(); props.setTarget(props.item); props.setMode("detail")}}>
            <Row>
                <Col xs={10}>
                    {props.item.representer}
                </Col>
                <Col xs={2}>
                    Type: {props.item.type}
                </Col>
            </Row>

        </ListGroupItem>
    )
}