import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAll} from "../../store";

const Users = () => {

    const dispatch = useAppDispatch();
    useEffect(()=> {
        dispatch(getAll())
    },[])

    const {users} = useAppSelector(state => state.authReducer);

    return (
        <div>
            {users}
        </div>
    );
};

export default Users;
