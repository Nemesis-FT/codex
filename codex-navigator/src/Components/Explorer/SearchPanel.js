import {useEffect, useState} from 'react';
import Panel from "../Bricks/Panel";
import {Dropdown, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {levenshteinEditDistance} from "levenshtein-edit-distance";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useAppContext} from "../../libs/Context";
import Style from "./SearchPanel.module.css"
import SearchResult from "./SearchResult";
import ListGroup from "react-bootstrap/ListGroup";

function SearchPanel(props) {

    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    const {address, setAddress} = useAppContext()
    const {token, setToken} = useAppContext()


    class QueryResult {
        constructor(representer, summary, uid, type, data) {
            this.representer = representer
            this.summary = summary
            this.uid = uid
            this.type = type
            this.data = data
        }
    }

    async function gather_everything() {
        let result = []
        let queriables = ["world", "character", "campaign"]
        for (const key of queriables) {
            const response = await fetch(window.location.protocol + "//" + address + "/api/" + key + "/v1/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            let data = await response.json()
            for (const element of data) {
                switch (key) {
                    case "world":
                        result.push(new QueryResult(element.name, element.description, element.uid, key, element))
                        break;
                    case "character":
                        result.push(new QueryResult(element.name, element.backstory, element.uid, key, element))
                        break;
                    case "campaign":
                        result.push(new QueryResult(element.name, element.synopsis, element.uid, key, element))
                        break;
                }
            }
        }
        return result
    }

    async function lookup() {
        let data = await gather_everything()
        let result = []
        for (const item of data) {
            let distance = levenshteinEditDistance(query, item.representer)
            if (distance < 3) {
                result.push({item: item, rank: distance})
            }
        }
        result.sort(function (a, b) {
            if (a.rank < b.rank) {
                return -1
            }
            if (a.rank > b.rank) {
                return 1
            }
            return 0
        })
        console.debug(result)
        setResults(result)
    }

    return (
        <div>
            <h4>What are you looking for?</h4>
            <Form>
                <Row>
                    <Col xl="10">
                        <Form.Control
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="..."
                            onChange={e => {
                                setQuery(e.target.value)
                            }}
                        />
                    </Col>
                    <Col xl="auto">
                        <Button variant="light" onClick={lookup}>Search everywhere</Button>
                    </Col>
                </Row>
            </Form>
            {results.length>0 &&
            <Panel>
                <div className={Style.Scrollable}>
                <h5>Here are your results:</h5>
                <ListGroup>
                    {results.map(elem => <SearchResult key={elem.uid} id={elem.uid} item={elem.item} setMode={props.setMode} setTarget={props.setTarget} key={elem.uid}/>)}
                </ListGroup>
                </div>
            </Panel>
            }
        </div>
    );
}

export default SearchPanel;