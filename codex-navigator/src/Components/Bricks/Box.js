import Style from "./Box.module.css";
export default function Box(props){
    return (<div className={Style.baseBox}>
        {props.children}
    </div>)
}