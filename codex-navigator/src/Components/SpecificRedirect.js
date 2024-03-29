import {useNavigate, useParams} from "react-router-dom";
import {useAppContext} from "../libs/Context";
import React, {useEffect, useState} from "react";
import DetailsTab from "./Explorer/DetailsTab";
import Panel from "./Bricks/Panel";
import {QueryResult} from "./Explorer/SearchPanel";

export default function SpecificRedirect(){
    let {addr} = useParams()
    // chr, cmp, wrl, stt
    let {type} = useParams()
    let {id} = useParams()
    const {address, setAddress} = useAppContext()
    const navigate = useNavigate()
    const [result, setResult] = useState(null)
    const [error, setError] = useState(true)

    const [done, setDone] = useState(false)
    useEffect(()=>{
        if(addr==null){
            return;
        }
        localStorage.setItem("address", addr)
        setAddress(addr)
        get_data().then(e => {setDone(true)})
    }, [])


    async function get_data(){
        let lookup = {"chr": "character", "cmp":"campaign", "wrl":"world", "stt":"setting"}
        if(type==null){
            return
        }
        try{
            const response = await fetch(window.location.protocol + "//" + addr + "/api/" + lookup[type] + "/v1/"+id);
            let data = await response.json()
            setResult(new QueryResult(data[lookup[type]].name, "", data[lookup[type]].uid, lookup[type], data))
        } catch (e){
            setError(true)
        }

    }
    if (error){
        return (<Panel>What you're looking for cannot be found. <a href="#" onClick={event => {navigate("/srv/home")}}>Click here</a> to go to the homepage.</Panel>)
    }
    if (!done){
        return (<Panel>Please wait while we roll [History] on this content...</Panel>)
    }
    return (<DetailsTab item={result}/>)
}