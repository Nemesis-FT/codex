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

function WorldDetails(props) {

    const [child, setChild] = useState(null)
    const [mode, setMode] = useState("world")
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()
    const [ext, setExt] = useState(null)
    const [parent, setParent] = useState(null);
    const [settings, setSettings] = useState([])

    const [target, setTarget] = useState(props.target);

    const {bread, setBread} = useBreadContext()

    useEffect(e => {
        const tmp = props.target.settings.sort(compare)
        setSettings(tmp)
    }, [props.target])

    function compare(a, b) {
        return parseInt(a.timeframe) > parseInt(b.timeframe)
    }

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
                        Name: {target.world.name}
                    </ListGroup.Item>
                    <ListGroup.Item key="owner">
                        Owner: {target.creator.username}
                    </ListGroup.Item>
                    <ListGroup.Item key="id">
                        UUID: {target.world.uid}
                    </ListGroup.Item>
                </ListGroup>
                <h5>Description</h5>
                <MDEditor.Markdown source={target.world.description} style={mdestyle}/>
            </Panel>
            {settings.length !== 0 && <div className={Style.Spacing}>
                <Accordion>
                    <Accordion.Item eventKey={target.world.uid}>
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
                                        <Col xs={1}>
                                            <FontAwesomeIcon onClick={event => {
                                                setBread([...bread, new Bread(target.world.name, target.world.uid, "world", target.world,
                                                    {
                                                        type: "setting",
                                                        campaign: {...elem},
                                                        uid: elem.uid,
                                                        representer: elem.timeframe
                                                    })])
                                            }} icon={faSearch}/>
                                        </Col>
                                    </Row>
                                </Panel>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>}
            {target.world.based_on === null &&
                <Button variant={"light"} onClick={setParent({
                    type: "world",
                    data: target.world.based_on, uid: target.world.uid
                })}>
                    Based on: {target.world.based_on.name} </Button>
            }
        </div>
    );
}

export default WorldDetails;