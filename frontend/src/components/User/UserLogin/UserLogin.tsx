import React, {FC} from 'react';
import {useForm} from "react-hook-form";

import {IUser} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getAll, loginUser} from "../../../store";

const UserLogin: FC = () => {
    const {access_token} = useAppSelector(state => state.authReducer);

    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset} = useForm();

    const submit: any = async (data: Partial<IUser>) => {
        await dispatch(loginUser(data));
        reset();
    }
    dispatch(getAll(access_token))


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
