import Style from "./OverPanel.module.css";
export default function OverPanel(props){
    return (<div className={Style.basePanel}>
        {props.children}
    </div>)
}