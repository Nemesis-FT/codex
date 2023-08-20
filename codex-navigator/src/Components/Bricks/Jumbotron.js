import Style from "./Jumbotron.module.css";
import Panel from "./Panel";

export default function Jumbotron(props) {
    return (<Panel>
        <div className={Style.Jumbotron}>
            <h1 className={Style.JumbotronTitle}>{props.title}</h1>
            {props.children}
        </div>
    </Panel>)
}