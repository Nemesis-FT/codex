import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MDEditor from '@uiw/react-md-editor';
import {useEffect, useState} from "react";
import {useAppContext} from "../../libs/Context";
import {Accordion, Alert} from "react-bootstrap";
import Panel from "./Panel";
import Picker from "./Picker";
import MultiverseExplorer from "./MultiverseExplorer";
import Style from "./MultiverseExplorer.module.css"

function CharacterPanel(props) {
    const [rootCharList, setRootCharList] = useState([])
    const [selectedRootChar, setSelectedRootChar] = useState(null)
    const [enabled, setEnabled] = useState(true)
    const [show, setShow] = useState(true)

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    useEffect(() => {
        get_root_character()
    }, [])

    useEffect(() => {
        setEnabled(false)
        setTimeout(e => {
            setEnabled(true)
        }, 100)
    }, [selectedRootChar])

    async function get_root_character() {
        if (!props.character) {
            const response = await fetch(window.location.protocol + "//" + address + "/api/character/v1/", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                },
            });
            let data = await response.json()
            setRootCharList(data)
        } else {
            await get_child_characters(props.character.uid)
        }
    }

    async function get_child_characters(uid) {
        const response = await fetch(window.location.protocol + "//" + address + "/api/character/v1/" + uid, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': "application/json"
            },
        });
        let data = await response.json()
        if (data.extended_by.length === 0) {
            setShow(false)
        } else {
            setRootCharList(data.extended_by)
        }

    }

    return (

        <div className={Style.MVERow}>
            {show &&
            <div>
                <Row>
                    <Col>
                    <Picker list={rootCharList} value={selectedRootChar} setValue={setSelectedRootChar}
                            representer={"name"}
                            onover_field={"backstory"}>
                    </Picker>
                    </Col>
                    <Col>
                        {selectedRootChar &&
                            <Button onClick={event => {props.savefun(selectedRootChar)}}> Pick this one </Button>
                        }
                    </Col>
                </Row>
                {selectedRootChar && enabled &&
                <MultiverseExplorer character={selectedRootChar} savefun={props.savefun}/>
                }
            </div>
            }
        </div>
    );
}

export default CharacterPanel;
