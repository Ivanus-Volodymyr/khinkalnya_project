import React, {FC} from 'react';
import {useForm} from "react-hook-form";

import {IUser} from "../../../interfaces";
import {useAppDispatch} from "../../../hooks";
import {loginUser} from "../../../store";
import {Link} from "react-router-dom";

const UserLogin: FC = () => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset} = useForm();

    const submit: any = async (data: Partial<IUser>) => {
        await dispatch(loginUser(data));
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
                    <Link to={'/users'}>
                        <button>Login</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;
