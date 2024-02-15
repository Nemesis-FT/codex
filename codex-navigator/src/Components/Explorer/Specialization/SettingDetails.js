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
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function SettingDetails(props) {

    const [child, setChild] = useState(null)
    const [mode, setMode] = useState("setting")
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const [ext, setExt] = useState(null)
    if (mode === "setting") {
        return (
            <div>
                <h3>Setting details</h3>
                <Panel>
                    <h3>General information</h3>
                    <ListGroup>
                        <ListGroup.Item key="timeframe">
                            Timeframe: {props.target.setting.timeframe}
                        </ListGroup.Item>
                        <ListGroup.Item key="world">
                            World: {props.target.world.name} <FontAwesomeIcon icon={faSearch} onClick={event => {setExt(props.target.world);
                            setMode("world")}}/>
                        </ListGroup.Item>
                        <ListGroup.Item key="owner">
                            Owner: {props.target.owner.username}
                        </ListGroup.Item>
                        <ListGroup.Item key="id">
                            UUID: {props.target.setting.uid}
                        </ListGroup.Item>
                    </ListGroup>
                    <h5>Description</h5>
                    <MDEditor.Markdown source={props.target.setting.description} style={mdestyle}/>
                </Panel>
                {props.target.campaigns.length !== 0 && <div className={Style.Spacing}>
                    <Accordion>
                        <Accordion.Item eventKey={props.target.setting.uid}>
                            <Accordion.Header>Campaigns</Accordion.Header>
                            <Accordion.Body>
                                {props.target.campaigns.map(elem =>
                                    <Panel key={elem.uid}>
                                        <Row>
                                            <Col xs={1}>
                                                {elem.name}
                                            </Col>
                                            <Col>
                                                <MDEditor.Markdown source={elem.synopsis}
                                                                   style={mdestyle}/>
                                            </Col>
                                            <Col xs={1} onClick={event => {
                                                setExt(elem);
                                                setMode("campaign")
                                            }}>
                                                <FontAwesomeIcon icon={faSearch} onClick={event => {
                                                    setExt(elem);
                                                    setMode("campaign")
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
    } else if (mode === "world") {
        return <DetailsTab item={{type: mode, data: ext, uid: ext.uid, representer: ext.name}} parent={props.target}/>
    } else if (mode === "campaign"){
        return <DetailsTab item={{type: mode, data: ext, uid: ext.uid, representer: ext.name}} parent={props.target}/>
    }
}

export default SettingDetails;