import Style from './App.css';
import Routes from "./Routing"
import {AppContext} from "./libs/Context"
import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import Navi from "./Components/Navi";

function App() {
    const [token, setToken] = useState(null);
    const [address, setAddress] = useState(null)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        document.body.style.background = "#212529"
        document.body.style.color = "#fff"
        if (localStorage.getItem("address")) {
            setAddress(localStorage.getItem("address"))
        }
    }

    return (
        <div>
            <AppContext.Provider value={{
                token,
                setToken,
                address,
                setAddress,
                userData,
                setUserData,
            }}>
                <Navi/>
                <div className={Style.Container}>
                    <Container data-bs-theme="dark">
                        <Routes/>
                    </Container>
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
