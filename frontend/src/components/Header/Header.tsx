import React from 'react';
import {isExpired} from "react-jwt";

import './Header.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {logoutUser} from "../../store";

const Header = () => {
    const {user} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    const refresh_token = localStorage.getItem('refresh_token');
    const item = isExpired(refresh_token as string);

    const logout: any = () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            <div className={'header_menu'}>
                <div>
                    <a href="/"> <img src="/image-for-header/logoKhinkalnya.jpg" width={'150px'} alt="logo"/></a>
                </div>
                <div className={'item_header_menu'}>
                    <img src="/image-for-header/discount.svg" width={'50px'} height={'40px'} alt="discount"/>
                    Акції
                </div>
                <div className={'item_header_menu'}>
                    <img src="/image-for-header/khinkali.svg" width={'50px'} height={'40px'} alt="khinkali_menu"/>
                    Хінкалі
                </div>
                <div className={'item_header_menu'}>
                    <img src="/image-for-header/khachapuri.svg" width={'50px'} height={'40px'} alt="khachapuri_menu"/>
                    Хачапурі
                </div>
                <div className={'item_header_menu'}>
                    <img src="/image-for-header/main_dish.svg" width={'50px'} height={'40px'} alt="main_dish_menu"/>
                    Гарячі Закуски
                </div>
                <div className={'item_header_menu'}>
                    <img src="/image-for-header/first_dish.svg" width={'50px'} height={'40px'} alt="first_dish_menu"/>
                    Перші Страви
                </div>
                <div className={'item_header_menu'}>
                    <img src="/image-for-header/salad.svg" width={'50px'} height={'40px'} alt="first_dish_menu"/>
                    Салати
                </div>
                <div className={'item_header_menu'}>
                    <img src="/image-for-header/cold_dish.svg" width={'50px'} height={'40px'} alt="cold_dish_menu"/>
                    Холодні Закуски
                </div>
                <div className={'item_header_menu'}>
                    <img src="/image-for-header/cake.svg" width={'50px'} height={'40px'} alt="sweet_menu"/>
                    Десерти
                </div>
                <div className={'item_header_menu'}>
                    <img src="/image-for-header/information.svg" width={'50px'} height={'40px'} alt="information_menu"/>
                    Інформація
                </div>
                <div>
                    <img src="/image-for-header/cart.png" width={'80px'} height={'50px'} alt="cart"/>
                </div>
                <div>
                    {item ? <a href="/auth/login"> Увійти</a> : <button onClick={logout}>Вийти</button>}
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default Header;
