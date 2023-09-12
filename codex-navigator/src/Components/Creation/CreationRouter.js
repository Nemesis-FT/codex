import {useState} from 'react';
import WorldPanel from "./WorldPanel";
import SettingPanel from "./SettingPanel";
import CampaignPanel from "./CampaignPanel";


function CreationRouter(props) {
    if(props.mode === "World"){
        return (
            <WorldPanel/>
        );
    }
    else if(props.mode === "Setting"){
        return(
            <SettingPanel/>
        );
    }
    else if(props.mode === "Campaign"){
        return(
            <CampaignPanel/>
        )
    }
    else{
        return(<p>Please, choose something from the left panel...</p>)
    }

}

export default CreationRouter;