import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { getMenuCategories } from "../../redux/menu-reducer";
import { useAuth } from "../../utilites/firebase/auth";
import { getCategories } from "../../utilites/firebase/firestore";
import s from './AdminPage.module.css';

const AdminPage = (props) => {
    const { authUser } = useAuth();
    const onSubmit = () => {
        getMenuCategories();
    }
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await getCategories(setCategories);
        }
        if (authUser) {
            return () => fetchData();
        }
    }, [authUser])
    return (
        !authUser ?
            <Navigate to={'/login'} />
            :
            <div className={`${s.adminPage} ${"container"}`}>
                <div className={s.categories}>
                    <div className={s.topicName}>
                        categories
                    </div>
                    {categories.map(category => <div key={category}>{category}</div>)}
                </div>
                <div className={s.dishes}>
                    <div className={s.topicName}>
                        страви
                    </div>
                </div>
                <button onClick={onSubmit}>get categories</button>
            </div>
    );
}

export default AdminPage;