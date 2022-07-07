import React, {FC} from 'react';
import {useForm} from "react-hook-form";

import {IUser} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {loginUser} from "../../../store";
import {Navigate} from "react-router-dom";

const UserLogin: FC = () => {
    const {active} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset,} = useForm();

    const submit: any = async (data: Partial<IUser>) => {
        await dispatch(loginUser(data));
        reset();
    }

    const role = localStorage.getItem('role');


    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={'login'}>
                    <div><input type="text" placeholder={'email'}{...register('email')}/></div>
                    <div><input type="text" placeholder={'password'}{...register('password')}/></div>
                </div>
                <div>
                    {/*{active ? <Navigate to={'/users'}/> : <div>Please, enter email and password</div>}*/}
                    {role ==='admin' && <Navigate to={'/users'}/>}
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;
