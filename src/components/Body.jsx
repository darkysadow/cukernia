import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./AdminPage/AdminPage";
import s from './Body.module.css'
import MainPage from "./MainPage/MainPage";
import MenuPage from "./Menu/MenuPage";
import Login from "./LoginPage/Login";
import TestForm from "./TestForm/TestForm";
import SecondTestForm from "./TestForm/SecondTestForm";
import PagePreloader from "./common/PagePreloader";
import AdminTest from "./AdminPage/AdminTest";


const Body = (props) => {
    return (<div className={s.main}>
            <Routes>
                <Route path="/main" element={<MainPage />} />
                <Route path="/*" element={<MainPage />} />
                <Route path='/menu' element={<MenuPage/>} />
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/test' element={<TestForm />} />
                <Route path='/test2' element={<SecondTestForm />} />
                <Route path='/pagepreloader' element={<PagePreloader />} />
                <Route path='/admintest' element={<AdminTest />} />
                {/*<Route path='/profile/:id' element={<UsersProfileContainer />} />*/}
            </Routes>
            </div>)
}
export default Body;