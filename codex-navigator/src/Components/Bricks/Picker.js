import {Dropdown} from "react-bootstrap";
import {CustomMenu, CustomToggle} from "./FilterDropdown";
import Style from "./Box.module.css";
import {useEffect, useState} from "react";

export default function Picker(props) {
    const [value, setValue] = useState(null);

    async function handle_select(event){
        props.list.forEach(element => {
            if(event.uid === element.uid){
                setValue(element)
                props.setValue(element)
            }
        })
    }

    return (<Dropdown onSelect={event => {
        handle_select(event)
    }}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            {value && <>{value.name}</>}
            {!value && <>...</>}
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
            {props.list.map(elem => <Dropdown.Item eventKey={elem.uid}
                                              key={elem.uid}>{elem.name}</Dropdown.Item>)}
        </Dropdown.Menu>
    </Dropdown>)
}

