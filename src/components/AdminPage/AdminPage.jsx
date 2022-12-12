import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../utilites/firebase/auth";
import s from './AdminPage.module.css';

const AdminPage = (props) => {
    const { authUser } = useAuth()
    return (
        !authUser ?
            <Navigate to={'/login'} />
            :
            <div className={`${s.adminPage} ${"container"}`}>
                <div className={s.categories}>
                    <div className={s.topicName}>
                        категорії
                    </div>
                </div>
                <div className={s.dishes}>
                    <div className={s.topicName}>
                        страви
                    </div>
                </div>
            </div>
    );
}

export default AdminPage;