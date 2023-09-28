import {Dropdown} from "react-bootstrap";
import {CustomMenu, CustomToggle} from "./FilterDropdown";
import Style from "./Picker.module.css";
import {useEffect, useState} from "react";
import MDEditor from "@uiw/react-md-editor";


export default function Picker(props) {
    const [value, setValue] = useState(null);
    const [over, setOver] = useState(null);

    async function handle_select(event) {
        props.list.forEach(element => {
            if (event === element.uid) {
                setValue(element)
                console.debug(element)
                props.setValue(element)
            }
        })
    }

    return (
        <Dropdown onSelect={event => {
            console.debug(event)
            handle_select(event)
        }}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                {value && <>{value[props.representer]}</>}
                {!value && <>...</>}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
                {props.list.map(elem => <Dropdown.Item eventKey={elem.uid}
                                                       key={elem.uid}
                                                       onContextMenu={event => {
                                                           event.preventDefault()
                                                           setOver(elem[props.onover_field])
                                                       }}>{elem[props.representer]}</Dropdown.Item>)}

                {over && <div className={Style.preview}>
                    <MDEditor.Markdown source={over} style={{whiteSpace: 'pre-wrap'}}/>
                </div>}
                {!over && <div className={Style.preview}>
                    <p>Right-click on an element to inspect its contents.</p>
                </div>}
            </Dropdown.Menu>
        </Dropdown>)
}

