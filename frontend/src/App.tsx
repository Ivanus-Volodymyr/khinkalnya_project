import React from 'react';
import './App.css';

import UserRegistration from "./components/User/UserRegistration/UserRegistration";
import UserLogin from "./components/User/UserLogin/UserLogin";

function App() {
    return (
        <div className="App">
            <UserLogin/>
            <UserRegistration/>
        </div>
    );
}

export default App;
