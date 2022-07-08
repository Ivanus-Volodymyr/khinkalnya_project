import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";

import UserRegistration from "./components/User/UserRegistration/UserRegistration";
import UserLogin from "./components/User/UserLogin/UserLogin";
import Layout from "./components/Layout/Layout";
import Users from "./components/Users/Users";
import Admin from "./components/Admin/Admin";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route path={'/admin'} element={<Admin/>}></Route>
                    <Route path={'/auth/registration'} element={<UserRegistration/>}></Route>
                    <Route path={'/auth/login'} element={<UserLogin/>}></Route>
                    <Route path={'/users'} element={<Users/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
