import React, {useEffect} from 'react';
import {userService} from "../../services";

const Admin = () => {
    const id = localStorage.getItem('userId');
    useEffect(() => {
        if (id) {
            userService.getUserById(id).then(value => console.log(value))
        }
    }, [])
    return (
        <div>
            <h1>Hello Admin</h1>
        </div>
    );
};

export default Admin;
