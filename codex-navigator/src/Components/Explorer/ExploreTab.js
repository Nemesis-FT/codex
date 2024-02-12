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
import DetailsTab from "./DetailsTab";

function ExploreTab() {

    const [mode, setMode] = useState("search")
    const [target, setTarget] = useState(null)

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    return (
            <div>
                {mode === "search" && <SearchPanel mode={mode} setMode={setMode} target={target} setTarget={setTarget}/>}
                {mode === "detail" && <div>
                    <Button variant="light"onClick={e => {setMode("search")}}>Go back</Button>
                    <DetailsTab item={target}/>
                </div>}
            </div>

    );
}

export default ExploreTab;