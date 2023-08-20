import Panel from "./Panel";
import Style from "./BreakPanel.module.css";

export default function BreakPanel(props) {
    return (
        <div className={Style.BreakPanel}>
            <Panel >
                {props.children}
            </Panel>
        </div>
    )
}