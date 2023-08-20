import Style from "./Panel.module.css";
export default function Panel(props){
    return (<div className={Style.basePanel}>
        {props.children}
    </div>)
}