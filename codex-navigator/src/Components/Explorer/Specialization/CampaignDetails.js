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
import OverPanel from "../../Bricks/OverPanel";

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
            <Row>
                <Col>
                    <Panel>
                        <h3>General information</h3>
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
                                <MDEditor.Markdown source={target.campaign.synopsis}
                                                   style={mdestyle}/>
                    </Panel>
                </Col>
                <Col>
                    <OverPanel>
                        <div className={Style.Spacing}>
                            <Accordion>
                                <Accordion.Item eventKey={target.campaign.uid}>
                                    <Accordion.Header>Retelling</Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{"overflow-y": "scroll", "max-height": "15rem"}}>
                                            <MDEditor.Markdown source={target.campaign.retelling} style={mdestyle}/>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        {target.happenings.length !== 0 && <div className={Style.Spacing}>
                            <Accordion>
                                <Accordion.Item eventKey={target.campaign.uid}>
                                    <Accordion.Header>Happenings</Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{"overflow-y": "scroll", "max-height": "15rem"}}>
                                            {target.happenings.map(elem =>
                                                <Panel key={elem.character.uid}>
                                                    <h5>
                                                        {elem.character.name} <FontAwesomeIcon icon={faSearch}
                                                                                               onClick={event => {
                                                                                                   setBread([...bread, new Bread(target.campaign.name, target.campaign.uid, "campaign", target.campaign,
                                                                                                       {
                                                                                                           type: "character",
                                                                                                           character: {...elem.character},
                                                                                                           uid: elem.character.uid,
                                                                                                           representer: elem.character.name
                                                                                                       })])
                                                                                               }}/>
                                                    </h5>
                                                    <MDEditor.Markdown source={elem.character_history.content}
                                                                       style={mdestyle}/>
                                                </Panel>
                                            )}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>}

                        {target.setting.length !== 0 && <div className={Style.Spacing}>
                            <Accordion>
                                <Accordion.Item eventKey={target.campaign.uid}>
                                    <Accordion.Header>Campaign setting</Accordion.Header>
                                    <Accordion.Body>
                                        <div style={{"overflow-y": "scroll", "max-height": "15rem"}}>
                                            {target.setting.map(elem =>
                                                <Panel key={elem.uid}>
                                                    <h5>{elem.timeframe} <FontAwesomeIcon icon={faSearch}
                                                                                          onClick={event => {
                                                                                              setBread([...bread, new Bread(target.campaign.name, target.campaign.uid, "campaign", target.campaign.name,
                                                                                                  {
                                                                                                      type: "setting",
                                                                                                      setting: {...elem},
                                                                                                      uid: elem.uid,
                                                                                                      representer: elem.timeframe
                                                                                                  })])
                                                                                          }}/></h5>
                                                    <MDEditor.Markdown source={elem.description}
                                                                       style={mdestyle}/>

                                                </Panel>
                                            )}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>}
                    </OverPanel>
                </Col>
            </Row>
        </div>
    );

}

export default CampaignDetails;