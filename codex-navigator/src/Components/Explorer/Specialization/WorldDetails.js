import React, {useEffect, useState} from 'react';
import Panel from "../../Bricks/Panel";
import {Accordion, Dropdown, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {levenshteinEditDistance} from "levenshtein-edit-distance";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAppContext} from "../../../libs/Context";
import ListGroup from "react-bootstrap/ListGroup";
import MDEditor from "@uiw/react-md-editor";
import DetailsTab from "../DetailsTab";
import Style from "./CharacterDetails.module.css"
import {mdestyle} from "../../Bricks/MDEStyle";

function WorldDetails(props) {

    const [child, setChild] = useState(null)
    const [mode, setMode] = useState("world")
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const [ext, setExt] = useState(null)
    if (mode === "world") {
        return (
            <div>
                {props.target.world.based_on === null && <Button variant={"light"}>
                    Based on: {props.target.world.based_on.name} </Button>
                }
                <h3>World details</h3>
                <Panel>
                    <h3>General information</h3>
                    <ListGroup>
                        <ListGroup.Item key="name">
                            Name: {props.target.world.name}
                        </ListGroup.Item>
                        <ListGroup.Item key="owner">
                            Owner: {props.target.creator.username}
                        </ListGroup.Item>
                        <ListGroup.Item key="id">
                            UUID: {props.target.world.uid}
                        </ListGroup.Item>
                    </ListGroup>
                    <h5>Description</h5>
                    <MDEditor.Markdown source={props.target.world.description} style={mdestyle}/>
                </Panel>
                {props.target.settings.length !== 0 && <div className={Style.Spacing}>
                    <Accordion>
                        <Accordion.Item eventKey={props.target.world.uid}>
                            <Accordion.Header>Events</Accordion.Header>
                            <Accordion.Body>
                                {props.target.settings.map(elem =>
                                    <Panel key={elem.uid}>
                                        <Row>
                                            <Col xs={1}>
                                                {elem.timeframe}
                                            </Col>
                                            <Col>
                                                <MDEditor.Markdown source={elem.description}
                                                                   style={mdestyle}/>
                                            </Col>
                                            <Col xs={1} onClick={event => {
                                                setExt(elem);
                                                setMode("setting")
                                            }}>
                                                Learn more
                                            </Col>
                                        </Row>
                                    </Panel>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>}
            </div>
        );
    } else if (mode === "setting") {
        return <DetailsTab item={{type: mode, data: ext, uid: ext.uid, representer: ext.name}} parent={props.target}/>
    }
}

export default WorldDetails;