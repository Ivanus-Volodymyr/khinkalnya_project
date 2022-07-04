import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAll} from "../../store";

const Users = () => {

    const dispatch = useAppDispatch();
    useEffect(()=> {
        dispatch(getAll())
    },[])

    const {user} = useAppSelector(state => state.authReducer);

    return (
        <div>
        </div>
    );
};

export default Users;
