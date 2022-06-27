import React, {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {IUser} from "../../../interfaces";
import {authService} from "../../../services";

const UserRegistration: FC= () => {
    const {handleSubmit, reset, register} = useForm()
    const [data, setData] = useState({});

    const submit: any = async (data: IUser) => {
        const response = await authService.registration(data);
        setData(response);
        reset()
    }
    console.log(data);
    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={'registration'}>
                    <div><input type="text" placeholder={'name'}{...register('name')}/></div>
                    <div><input type="text" placeholder={'email'}{...register('email')}/></div>
                    <div><input type="number" placeholder={'age'}{...register('age')}/></div>
                    <div><input type="text" placeholder={'city'}{...register('city')}/></div>
                    <div><input type="text" placeholder={'password'}{...register('password')}/></div>
                    <div><button >Registration</button></div>
                </div>
            </form>
        </div>
    );
};

export default UserRegistration;
