import {useEffect, useState} from 'react';
import Panel from "../Bricks/Panel";
import {Dropdown, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {levenshteinEditDistance} from "levenshtein-edit-distance";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAppContext} from "../../libs/Context";
import Style from "./SearchPanel.module.css"
import SearchResult from "./SearchResult";
import ListGroup from "react-bootstrap/ListGroup";
import SearchPanel from "./SearchPanel";
import {AppContext} from "../../libs/Context"
import CharacterDetails from "./Specialization/CharacterDetails";
import CampaignDetails from "./Specialization/CampaignDetails";
import SettingDetails from "./Specialization/SettingDetails";
import WorldDetails from "./Specialization/WorldDetails";

function DetailsTab(props) {

    const [data, setData] = useState(null)
    const [done, setDone] = useState(false)
    const [parent, setParent] = useState(props.parent)

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    useEffect(() => {
        gather_more(props.item).then(r => setDone(true))
    }, [props.item])

    async function gather_more(target) {
        console.debug(target)
        const response = await fetch(window.location.protocol + "//" + address + "/api/" + target.type + "/v1/" + target.uid, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        let d = await response.json();
        d.type = target.type
        d.representer = target.representer

        setData(d)
        console.debug(d)
    }

    if (!done) {
        return (
            <div>
                <p>Please wait, now loading...</p>
            </div>
        );
    } else {
        return (
            <div>
                {parent !== undefined && <Button variant="light" onClick={event => {
                    setData(parent);
                    setParent(undefined)
                }}>Go back to {parent.representer}</Button>}
                {data.type === "character" && <CharacterDetails target={data}/>}
                {data.type === "campaign" && <CampaignDetails target={data}/>}
                {data.type === "setting" && <SettingDetails target={data}/>}
                {data.type === "world" && <WorldDetails target={data}/>}
            </div>
        )
    }
}

export default DetailsTab;