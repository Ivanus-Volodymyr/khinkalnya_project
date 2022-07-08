import React, {FC} from 'react';
import {useForm} from "react-hook-form";

import {IUser} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {loginUser} from "../../../store";
import {useNavigate} from "react-router-dom";

const UserLogin: FC = () => {
    const {active} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset,} = useForm();
    const navigate = useNavigate();

    const checkRole: any = async () => {
        let roleFromStorage = await localStorage.getItem('role');
        if (roleFromStorage === 'user') {
            navigate('/users');
        }
        if (roleFromStorage === 'admin') {
            navigate('/admin');
        }
    }

    const submit: any = async (data: Partial<IUser>) => {
        await dispatch(loginUser(data));
        await checkRole();
        reset();
    }


    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={'login'}>
                    <div><input type="text" placeholder={'email'}{...register('email')}/></div>
                    <div><input type="text" placeholder={'password'}{...register('password')}/></div>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;
