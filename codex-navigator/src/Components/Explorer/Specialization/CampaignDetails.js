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

function CampaignDetails(props) {

    const [child, setChild] = useState(null)
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    const [ext, setExt] = useState(null)
    const [mode, setMode] = useState("campaign")
    if (mode === "campaign") {
        return (
            <div>
                <h3>Campaign details</h3>
                <Panel>
                    <h3>General information</h3>
                    <Row className={Style.Spacing}>
                        <Col>
                            <ListGroup>
                                <ListGroup.Item key="name">
                                    Name: {props.target.campaign.name}
                                </ListGroup.Item>
                                <ListGroup.Item key="lifetime">
                                    Start date/End
                                    date: {props.target.campaign.start_date}/{props.target.campaign.end_date}
                                </ListGroup.Item>
                                <ListGroup.Item key="dm">
                                    Master: {props.target.dm.username}
                                </ListGroup.Item>
                                <ListGroup.Item key="members">
                                    Members: {props.target.members.map(elem => {
                                    return elem.username
                                })}
                                </ListGroup.Item>
                                <ListGroup.Item key="id">
                                    UUID: {props.target.campaign.uid}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col>
                            <MDEditor.Markdown source={props.target.campaign.synopsis}
                                               style={mdestyle}/>
                        </Col>
                    </Row>
                    <MDEditor.Markdown source={props.target.campaign.retelling} style={mdestyle}/>
                </Panel>
                {props.target.happenings.length !== 0 && <div className={Style.Spacing}>
                    <Accordion>
                        <Accordion.Item eventKey={props.target.campaign.uid}>
                            <Accordion.Header>Happenings</Accordion.Header>
                            <Accordion.Body>
                                {props.target.happenings.map(elem =>
                                    <Panel key={elem.character.uid}>
                                        <Row>
                                            <Col>
                                                <MDEditor.Markdown source={elem.character_history.content}
                                                                   style={mdestyle}/>
                                            </Col>
                                            <Col xs={3} onClick={event => {
                                                setExt(elem.character);
                                                console.debug(elem.character);
                                                setMode("character")
                                            }}>
                                                Character: {elem.character.name}
                                            </Col>
                                        </Row>
                                    </Panel>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>}

                {props.target.setting.length !== 0 && <div className={Style.Spacing}>
                    <Accordion>
                        <Accordion.Item eventKey={props.target.campaign.uid}>
                            <Accordion.Header>Campaign setting</Accordion.Header>
                            <Accordion.Body>
                                {props.target.setting.map(elem =>
                                    <Panel key={elem.uid}>
                                        <Row>
                                            <Col xs={1}>{elem.timeframe}</Col>
                                            <Col>
                                                <MDEditor.Markdown source={elem.description}
                                                                   style={mdestyle}/>
                                            </Col>
                                            <Col xs={1} onClick={event => {
                                                setExt(elem);
                                                console.debug(elem);
                                                setMode("setting")
                                            }}>
                                                Details
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
    } else if (mode === "character") {
        return <DetailsTab item={{type: mode, data: ext, uid: ext.uid, representer: ext.name}} parent={props.target}/>
    }
    else if (mode==="setting"){
        return <DetailsTab item={{type: mode, data: ext, uid: ext.uid, representer: ext.timeframe}} parent={props.target}/>
    }
}

export default CampaignDetails;