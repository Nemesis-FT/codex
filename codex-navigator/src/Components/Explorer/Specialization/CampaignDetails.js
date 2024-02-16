import React, {useEffect, useState} from 'react';
import Panel from "../../Bricks/Panel";
import {Accordion, Breadcrumb, Dropdown, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {levenshteinEditDistance} from "levenshtein-edit-distance";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAppContext, useBreadContext} from "../../../libs/Context";
import ListGroup from "react-bootstrap/ListGroup";
import MDEditor from "@uiw/react-md-editor";
import DetailsTab, {Bread} from "../DetailsTab";
import Style from "./CharacterDetails.module.css"
import {mdestyle} from "../../Bricks/MDEStyle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function CampaignDetails(props) {

    const [child, setChild] = useState(null)
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const {bread, setBread} = useBreadContext()

    const [target, setTarget] = useState(props.target);
    const [ext, setExt] = useState(null)
    const [mode, setMode] = useState("campaign")
    return (
        <div>
            <h3>Campaign details</h3>
            <Panel>
                <h3>General information</h3>
                <Row className={Style.Spacing}>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item key="name">
                                Name: {target.campaign.name}
                            </ListGroup.Item>
                            <ListGroup.Item key="lifetime">
                                Start date/End
                                date: {target.campaign.start_date}/{target.campaign.end_date}
                            </ListGroup.Item>
                            <ListGroup.Item key="dm">
                                Master: {target.dm.username}
                            </ListGroup.Item>
                            <ListGroup.Item key="members">
                                Members: {target.members.map(elem => {
                                return elem.username
                            })}
                            </ListGroup.Item>
                            <ListGroup.Item key="id">
                                UUID: {target.campaign.uid}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>
                        <MDEditor.Markdown source={target.campaign.synopsis}
                                           style={mdestyle}/>
                    </Col>
                </Row>
                <MDEditor.Markdown source={target.campaign.retelling} style={mdestyle}/>
            </Panel>
            {target.happenings.length !== 0 && <div className={Style.Spacing}>
                <Accordion>
                    <Accordion.Item eventKey={target.campaign.uid}>
                        <Accordion.Header>Happenings</Accordion.Header>
                        <Accordion.Body>
                            {target.happenings.map(elem =>
                                <Panel key={elem.character.uid}>
                                    <Row>
                                        <Col>
                                            <MDEditor.Markdown source={elem.character_history.content}
                                                               style={mdestyle}/>
                                        </Col>
                                        <Col xs={1}>
                                            <FontAwesomeIcon icon={faSearch} onClick={event => {
                                                setBread([...bread, new Bread(target.campaign.name, target.campaign.uid, "campaign", target.campaign,
                                                    {type: "character", character: {...elem.character}, uid: elem.character.uid, representer: elem.character.name})])
                                            }}/>
                                        </Col>
                                    </Row>
                                </Panel>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>}

            {target.setting.length !== 0 && <div className={Style.Spacing}>
                <Accordion>
                    <Accordion.Item eventKey={target.campaign.uid}>
                        <Accordion.Header>Campaign setting</Accordion.Header>
                        <Accordion.Body>
                            {target.setting.map(elem =>
                                <Panel key={elem.uid}>
                                    <Row>
                                        <Col xs={1}>{elem.timeframe}</Col>
                                        <Col>
                                            <MDEditor.Markdown source={elem.description}
                                                               style={mdestyle}/>
                                        </Col>
                                        <Col xs={1}>
                                            <FontAwesomeIcon icon={faSearch} onClick={event => {
                                                setBread([...bread, new Bread(target.campaign.name, target.campaign.uid, "campaign", target.campaign.name,
                                                    {type: "setting", setting: {...elem}, uid: elem.uid, representer: elem.timeframe})])
                                            }}/>
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

}

export default CampaignDetails;