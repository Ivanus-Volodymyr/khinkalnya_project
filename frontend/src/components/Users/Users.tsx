import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAllUsers} from "../../store";

const Users = () => {
    const {users, status} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])


    console.log(status)
    return (
        <div>
            {status === 'pending' && <h1>Loading.........</h1>}
            {users && status === 'fulfilled' && users.map((value) => <div key={value.name}>{value.name}</div>)}
        </div>
    );
};

export default Users;
