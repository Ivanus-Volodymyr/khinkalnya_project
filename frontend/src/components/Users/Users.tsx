import React, {useEffect} from 'react';
import {userService} from "../../services";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAll} from "../../store";

const Users = () => {
    const {users, status} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(getAll())
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
