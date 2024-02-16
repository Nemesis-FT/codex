import React, {useEffect, useState} from 'react';
import Panel from "../../Bricks/Panel";
import {Accordion, Dropdown, Row} from "react-bootstrap";
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
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function SettingDetails(props) {

    const [child, setChild] = useState(null)
    const [mode, setMode] = useState("setting")
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const [ext, setExt] = useState(null)

    const [target, setTarget] = useState(props.target);

    const {bread, setBread} = useBreadContext()

    return (
        <div>
            <h3>Setting details</h3>
            <Panel>
                <h3>General information</h3>
                <ListGroup>
                    <ListGroup.Item key="timeframe">
                        Timeframe: {target.setting.timeframe}
                    </ListGroup.Item>
                    <ListGroup.Item key="world">
                        World: {target.world.name} <FontAwesomeIcon icon={faSearch} onClick={event => {
                        setBread([...bread, new Bread(target.setting.timeframe, target.setting.uid, "setting", target.setting,
                            {
                                type: "world",
                                world: {...target.world},
                                uid: target.world.uid,
                                representer: target.world.name
                            })])
                    }}/>
                    </ListGroup.Item>
                    <ListGroup.Item key="owner">
                        Owner: {target.owner.username}
                    </ListGroup.Item>
                    <ListGroup.Item key="id">
                        UUID: {target.setting.uid}
                    </ListGroup.Item>
                </ListGroup>
                <h5>Description</h5>
                <MDEditor.Markdown source={target.setting.description} style={mdestyle}/>
            </Panel>
            {target.campaigns.length !== 0 && <div className={Style.Spacing}>
                <Accordion>
                    <Accordion.Item eventKey={target.setting.uid}>
                        <Accordion.Header>Campaigns</Accordion.Header>
                        <Accordion.Body>
                            {target.campaigns.map(elem =>
                                <Panel key={elem.uid}>
                                    <Row>
                                        <Col xs={1}>
                                            {elem.name}
                                        </Col>
                                        <Col>
                                            <MDEditor.Markdown source={elem.synopsis}
                                                               style={mdestyle}/>
                                        </Col>
                                        <Col xs={1}>
                                            <FontAwesomeIcon icon={faSearch} onClick={event => {
                                                setBread([...bread, new Bread(target.setting.timeframe, target.setting.uid, "setting", target.setting,
                                                    {
                                                        type: "campaign",
                                                        campaign: {...elem},
                                                        uid: elem.uid,
                                                        representer: elem.name
                                                    })])
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

export default SettingDetails;