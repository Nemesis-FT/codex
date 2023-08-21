import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button} from "react-bootstrap";
import {useAppContext} from "../libs/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNetworkWired, faUser } from '@fortawesome/free-solid-svg-icons'

function Navi() {
    const {address, setAddress} = useAppContext()
    const {userData, setUserData} = useAppContext()
    const {token, setToken} = useAppContext()
    async function disconnect(){
        setAddress("")
        localStorage.setItem("address", "")
    }

    async function logout(){
        sessionStorage.removeItem("jwt")
        setToken(null)
        setUserData(null)
    }

    return (
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Codex</Navbar.Brand>
                <Navbar.Toggle/>

                <Navbar.Collapse className="basic-navbar-nav">
                    {address &&
                    <NavDropdown title={<FontAwesomeIcon icon={faNetworkWired} />} id="basic-nav-dropdown">
                        <NavDropdown.Item disabled>
                            Connected to {address}
                        </NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item onClick={event => disconnect()}>
                            Disconnect
                        </NavDropdown.Item>
                    </NavDropdown>
                    }
                    {userData &&
                        <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                            <NavDropdown.Item disabled>
                                Logged in as {userData.user.username}
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={event => logout()}>
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navi;