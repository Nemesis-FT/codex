import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Redirect from "./Components/Redirect";
import Home from "./Components/Home";
import SpecificRedirect from "./Components/SpecificRedirect";
import LoginRedirect from "./Components/LoginRedirect";

export default function Routing(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/srv/login" element={<Login/>}/>
                <Route path="/:addr" element={<Redirect/>}/>
                <Route path="/:addr/token/:tok" element={<LoginRedirect/>}></Route>
                <Route path="/srv/home" element={<Home/>}/>
                <Route path={"/:addr/specific/:type/:id"} element={<SpecificRedirect/>}/>
            </Routes>
        </Router>
    )
}