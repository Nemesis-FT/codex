import {useState} from 'react';
import WorldPanel from "./WorldPanel";
import SettingPanel from "./SettingPanel";


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
    else{
        return(<p>Please, choose something from the left panel...</p>)
    }

}

export default CreationRouter;