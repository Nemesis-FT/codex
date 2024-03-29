import React, {useEffect, useState} from 'react';
import Panel from "../Bricks/Panel";
import {Breadcrumb, Dropdown, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {levenshteinEditDistance} from "levenshtein-edit-distance";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {BreadContext, useAppContext} from "../../libs/Context";
import Style from "./SearchPanel.module.css"
import SearchResult from "./SearchResult";
import ListGroup from "react-bootstrap/ListGroup";
import SearchPanel from "./SearchPanel";
import {AppContext} from "../../libs/Context"
import CharacterDetails from "./Specialization/CharacterDetails";
import CampaignDetails from "./Specialization/CampaignDetails";
import SettingDetails from "./Specialization/SettingDetails";
import WorldDetails from "./Specialization/WorldDetails";

import {useBreadContext} from "../../libs/Context";
import {useNavigate} from "react-router-dom";
import navi from "../Navi";

export class Bread {
    constructor(representer, uid, type, data, next_data) {
        this.representer = representer
        this.uid = uid
        this.type = type
        this.data = data
        this.next_data = next_data
    }
}

function DetailsTab(props) {

    const [data, setData] = useState(null)
    const [done, setDone] = useState(false)
    const [parent, setParent] = useState(props.parent)
    const [bread, setBread] = useState([])
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()

    let lookup = {"character": "chr", "campaign":"cmp", "world":"wrl", "setting":"stt"}

    useEffect(() => {
        setDone(false)
        if (bread.length === 0) {
            gather_more(props.item).then(r => setDone(true))
        } else {
            gather_more(bread[bread.length - 1].next_data).then(r => setDone(true))
        }

    }, [bread])

    async function gather_more(target) {
        if(target === null){
            return
        }
        try{
            const response = await fetch(window.location.protocol + "//" + address + "/api/" + target.type + "/v1/" + target.uid, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            let d = await response.json();
            d.type = target.type
            d.representer = target.representer

            setData(d)
        }
        catch (e) {
            setError(true)
        }

    }
    return (
        <div>
            <br/>
            <BreadContext.Provider value={{setBread, bread, data, setData}}>
                <Breadcrumb>
                    <Breadcrumb.Item href="#" onClick={e => {
                        if (props.setMode !== undefined) {
                            props.setMode("search")
                        } else {
                            navigate("/srv/home")
                        }
                    }}>
                        Search
                    </Breadcrumb.Item>
                    {bread.map(elem => {
                        return <Breadcrumb.Item href="#" key={elem.uid} onClick={e => {
                            let tmp = bread
                            if (tmp.indexOf(elem) > 0) {
                                setDone(false)
                                tmp.length = tmp.indexOf(elem)
                                setBread(tmp)
                                gather_more(elem).then(e => {
                                    setDone(true)
                                })
                            } else {
                                setBread([])
                            }
                        }
                        }>{elem.representer}</Breadcrumb.Item>
                    })}
                </Breadcrumb>
                {error === false && <>
                {done === true && <>
                    {data.type === "character" && <CharacterDetails target={data}/>}
                    {data.type === "campaign" && <CampaignDetails target={data}/>}
                    {data.type === "setting" && <SettingDetails target={data}/>}
                    {data.type === "world" && <WorldDetails target={data}/>}
                </>}
                {done === false && <Panel>Please wait, now loading content...</Panel>}
                </>}
                {error === true && <Panel>The resource cannot be loaded.</Panel>}
            </BreadContext.Provider>
            <br/>
            <a href="#" onClick={event => {
                navigator.share({
                    url: window.location.origin + "/" + address + "/specific/" + lookup[data.type] + "/" + data[data.type].uid,
                    text: "Check out " + data.representer + " on Codex",
                    title: data.representer
                })
            }}>Share permalink</a>
        </div>)

}

export default DetailsTab;