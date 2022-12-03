import React from "react";
import s from "./Header.module.css";
import logo from './../../img/logo.jpg'

const Header = (props) => {
    return (<div className={s.header}>
        <div className={`${"container"} ${s.headerContainer}`}>
            <div className={s.headerLeft}>
                <div className={s.logo}>
                    <img src={logo} alt="Львівська Цукерня Вінниця" />
                </div>
                <div className={s.navMenu}>
                    <ul>
                        <li>Меню</li>
                        <li>Відгуки</li>
                        <li>Про нас</li>
                        <li>Контакти</li>
                    </ul>
                </div>
            </div>
            <div className={s.headerRight}>
                <p>вул. Грушевського, 28</p>
            </div>
        </div>
    </div>);
}

export default Header;