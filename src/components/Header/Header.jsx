import React from "react";
import s from "./Header.module.css";
import logo from './../../img/logo.jpg'
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../utilites/firebase/auth";
import { signOut } from "@firebase/auth";
import { auth } from "../../utilites/firebase/firebase";

const Header = (props) => {
    const navigate = useNavigate();
    const signOutHandler = () => {
        signOut(auth).then(() => {
            navigate('/login');
        })
    }
    const {authUser} = useAuth();
    return (<header className={s.header}>
        <div className={`${"container"} ${s.headerContainer}`}>
            <div className={s.headerLeft}>
                <div className={s.logo}>
                    <img src={logo} alt="Львівська Цукерня Вінниця" />
                </div>
                <div className={s.navMenu}>
                    <ul>
                        <li><NavLink to='/menu' className={({isActive}) => (isActive ? s.selected : 'none')}>Меню</NavLink></li>
                        <li><NavLink to='/main' className={({isActive}) => (isActive ? s.selected : 'none')}>Головна</NavLink></li>
                        <li>Про нас</li>
                        <li>Контакти</li>
                    </ul>
                </div>
            </div>
            <div className={s.headerRight}>
                {authUser && <div className={s.logoutButton} onClick={signOutHandler}>Вихід</div>}
                <p>вул. Грушевського, 28</p>
            </div>
        </div>
    </header>);
}

export default Header;