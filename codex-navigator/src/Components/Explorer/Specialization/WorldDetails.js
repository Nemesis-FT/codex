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

function WorldDetails(props) {

    const [child, setChild] = useState(null)
    const [mode, setMode] = useState("world")
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const [ext, setExt] = useState(null)
    const [parent, setParent] = useState(null);
    const [settings, setSettings] = useState([])

    useEffect(e =>{
        const tmp = props.target.settings.sort(compare)
        setSettings(tmp)
    }, [props.target])

    function compare(a, b){
        return parseInt(a.timeframe) > parseInt(b.timeframe)
    }


    if (mode === "world") {
        return (
            <div>
                {parent !== null &&
                    <div>
                        <DetailsTab item={parent}/>
                        <Button variant="light" className={Style.MargButton} onClick={e => {
                            setParent(null)
                        }}>
                            Clear</Button>
                    </div>
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
                {settings.length !== 0 && <div className={Style.Spacing}>
                    <Accordion>
                        <Accordion.Item eventKey={props.target.world.uid}>
                            <Accordion.Header>Events</Accordion.Header>
                            <Accordion.Body>
                                {settings.map(elem =>
                                    <Panel key={elem.uid}>
                                        <Row>
                                            <Col xs={1}>
                                                {elem.timeframe}
                                            </Col>
                                            <Col>
                                                <MDEditor.Markdown source={elem.description}
                                                                   style={mdestyle}/>
                                            </Col>
                                            <Col xs={1} >
                                                <FontAwesomeIcon onClick={event => {
                                                    setExt(elem);
                                                    setMode("setting")
                                                }} icon={faSearch} />
                                            </Col>
                                        </Row>
                                    </Panel>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>}
                {props.target.world.based_on === null &&
                    <Button variant={"light"} onClick={setParent({type: "world",
                        data: props.target.world.based_on, uid: props.target.world.uid})}>
                    Based on: {props.target.world.based_on.name} </Button>
                }
            </div>
        );
    } else if (mode === "setting") {
        return <DetailsTab item={{type: mode, data: ext, uid: ext.uid, representer: ext.name}} parent={props.target}/>
    }
}

export default WorldDetails;