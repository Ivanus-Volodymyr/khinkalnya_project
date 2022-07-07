import React from 'react';
import {userService} from "../../services";

const Users = () => {


    const users = userService.getAllUsers();
    console.log(users);


    return (
        <div>
        </div>
    );
};

export default Users;
