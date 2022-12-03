import React from "react";
import { Route, Routes } from "react-router-dom";
import s from './Body.module.css'
import MainPage from "./MainPage/MainPage";
import MenuPage from "./Menu/MenuPage";


const Body = (props) => {
    return (<div className={s.main}>
            <Routes>
                <Route path="/main" element={<MainPage />} />
                <Route path="/*" element={<MainPage />} />
                <Route path='/menu' element={<MenuPage/>} />
                {/*<Route path='/profile/:id' element={<UsersProfileContainer />} />*/}
            </Routes>
        Body</div>)
}
export default Body;