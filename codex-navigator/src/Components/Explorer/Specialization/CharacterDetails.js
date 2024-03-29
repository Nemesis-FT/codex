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
import OverPanel from "../../Bricks/OverPanel"
import AccordionStyle from "./CustomAccordion.css"

function CharacterDetails(props) {

    const [child, setChild] = useState(null)
    const [mode, setMode] = useState("character")
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const [ext, setExt] = useState(null)
    const {data, setData} = useBreadContext()
    const {bread, setBread} = useBreadContext()

    const [target, setTarget] = useState(props.target);

    if (mode === "character") {
        return (
            <div>
                <h3>Character details</h3>
                <Row>
                    <Col>
                        <Panel>
                            <h3>General information</h3>
                            <ListGroup>
                                <ListGroup.Item key="name">
                                    Name: {target.character.name}
                                </ListGroup.Item>
                                <ListGroup.Item key="class">
                                    Class: {target.character.levels}
                                </ListGroup.Item>
                                <ListGroup.Item key="race">
                                    Race: {target.character.race}
                                </ListGroup.Item>
                                <ListGroup.Item key="owner">
                                    Owner: {target.owner.username}
                                </ListGroup.Item>
                                <ListGroup.Item key="id">
                                    UUID: {target.character.uid}
                                </ListGroup.Item>
                            </ListGroup>
                        </Panel>
                    </Col>
                    <Col>
                        <OverPanel>
                            <div className={Style.Spacing}>
                                <Accordion>
                                    <Accordion.Item eventKey={target.character.uid}>
                                        <Accordion.Header>Background</Accordion.Header>
                                        <Accordion.Body>
                                            <div style={{"overflow-y": "scroll", "max-height": "15rem"}}>
                                                <MDEditor.Markdown source={target.character.backstory}
                                                                   style={mdestyle}/>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                            {target.relationships.length !== 0 && <div className={Style.Spacing}>
                                <Accordion>
                                    <Accordion.Item eventKey={target.character.uid}>
                                        <Accordion.Header>Meaningful relationships</Accordion.Header>
                                        <Accordion.Body>
                                            <div style={{"overflow-y": "scroll", "max-height": "15rem"}}>
                                                {target.relationships.map(elem =>
                                                    <Panel key={elem.character.uid}>
                                                        <h5>
                                                            {elem.character.name} <FontAwesomeIcon icon={faSearch}
                                                                                                   onClick={event => {
                                                                                                       setBread([...bread, new Bread(target.character.name, target.character.uid, "character", target.character.name,
                                                                                                           {
                                                                                                               type: "character",
                                                                                                               character: {...elem.character},
                                                                                                               uid: elem.character.uid,
                                                                                                               representer: elem.character.name
                                                                                                           })])
                                                                                                   }}/>
                                                        </h5>
                                                        {elem.character_relationship.content}
                                                    </Panel>
                                                )}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>}

                            {target.happenings.length !== 0 && <div className={Style.Spacing}>
                                <Accordion>
                                    <Accordion.Item eventKey={target.character.uid}>
                                        <Accordion.Header>Involvements</Accordion.Header>
                                        <Accordion.Body>
                                            <div style={{"overflow-y": "scroll", "max-height": "15rem"}}>
                                                {target.happenings.map(elem =>
                                                    <Panel key={elem.campaign.uid}>
                                                        <h5>
                                                            {elem.campaign.name} <FontAwesomeIcon icon={faSearch}
                                                                                                  onClick={event => {
                                                                                                      setBread([...bread, new Bread(target.character.name, target.character.uid, "character", target.character.name,
                                                                                                          {
                                                                                                              type: "campaign",
                                                                                                              campaign: {...elem.campaign},
                                                                                                              uid: elem.campaign.uid,
                                                                                                              representer: elem.campaign.name
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
                        </OverPanel>
                    </Col>
                </Row>

                {target.extended_by.length !== 0 && <div>
                    <h3>Extended by these characters</h3>
                    <div className={Style.Spacing}>
                        {target.extended_by.map(elem =>
                            <Button variant="light" className={Style.MargButton} key={elem.uid}
                                    onClick={event => {
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
    }
}

export default CharacterDetails;