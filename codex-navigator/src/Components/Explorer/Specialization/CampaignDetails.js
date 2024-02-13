import {useEffect, useState} from 'react';
import Panel from "../../Bricks/Panel";
import {Dropdown, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {levenshteinEditDistance} from "levenshtein-edit-distance";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAppContext} from "../../../libs/Context";
import ListGroup from "react-bootstrap/ListGroup";
import MDEditor from "@uiw/react-md-editor";
import DetailsTab from "../DetailsTab";
import Style from "./CharacterDetails.module.css"

function CampaignDetails(props) {

    const [child, setChild] = useState(null)
    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    return (
        <div>
            <h3>Campaign details</h3>
            <Panel>
                <h3>General information</h3>

            </Panel>
        </div>

    );
}

export default CampaignDetails;