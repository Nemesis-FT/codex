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

function CharacterDetails(props) {

    const [child, setChild] = useState(null)
    const [mode, setMode] = useState("character")
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const [ext, setExt] = useState(null)
    if (mode === "character") {
        return (
            <div>
                <h3>Character details</h3>
                <Panel>
                    <h3>General information</h3>
                    <ListGroup>
                        <ListGroup.Item key="name">
                            Name: {props.target.character.name}
                        </ListGroup.Item>
                        <ListGroup.Item key="class">
                            Class: {props.target.character.levels}
                        </ListGroup.Item>
                        <ListGroup.Item key="race">
                            Race: {props.target.character.race}
                        </ListGroup.Item>
                        <ListGroup.Item key="owner">
                            Owner: {props.target.owner.username}
                        </ListGroup.Item>
                        <ListGroup.Item key="id">
                            UUID: {props.target.character.uid}
                        </ListGroup.Item>
                    </ListGroup>
                    <h5>Background</h5>
                    <MDEditor.Markdown source={props.target.character.backstory} style={mdestyle}/>
                </Panel>
                {props.target.happenings.length !== 0 && <div className={Style.Spacing}>
                    <Accordion>
                        <Accordion.Item eventKey={props.target.character.uid}>
                            <Accordion.Header>Involvements</Accordion.Header>
                            <Accordion.Body>
                                {props.target.happenings.map(elem =>
                                    <Panel key={elem.campaign.uid}>
                                        <Row>
                                            <Col xs={2}>
                                                Campaign: {elem.campaign.name}
                                            </Col>
                                            <Col>
                                                <MDEditor.Markdown source={elem.character_history.content}
                                                                   style={mdestyle}/>
                                            </Col>
                                            <Col xs={1} onClick={event => {
                                                setExt(elem.campaign);
                                                setMode("campaign")
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
                {props.target.extended_by.length !== 0 && <div>
                    <h3>Extended by these characters</h3>
                    <div className={Style.Spacing}>
                        {props.target.extended_by.map(elem =>
                            <Button variant="light" className={Style.MargButton} key={elem.uid} onClick={event => {
                                setChild({type: "character", data: elem, uid: elem.uid})
                            }}> {elem.name} {elem.levels} </Button>
                        )}
                        {child !== null &&
                            <Button variant="light" className={Style.MargButton} onClick={e => {
                                setChild(null)
                            }}>
                                Clear</Button>}
                    </div>
                    {child !== null &&
                        <div>
                            <DetailsTab item={child}/>
                        </div>
                    } </div>
                }
            </div>

        );
    } else if (mode === "campaign") {
        return <DetailsTab item={{type: mode, data: ext, uid: ext.uid, representer: ext.name}} parent={props.target}/>
    }
}

export default CharacterDetails;