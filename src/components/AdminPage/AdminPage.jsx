import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../utilites/firebase/auth";
import { getAllDishes, getCategories } from "../../utilites/firebase/firestore";
import AdminMenuItem from "./AdminMenuItem";
import s from './AdminPage.module.css';

const AdminPage = (props) => {
    const { authUser } = useAuth();
    const [categories, setCategories] = useState([]);
    const [allDishes, setAllDishes] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await getCategories(setCategories);
            await getAllDishes(setAllDishes);
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
                        категорії
                    </div>
                    <div className={s.categoriesContainer}>
                        {categories.map(category => <div key={category} className={s.category}>{category}</div>)}
                    </div>
                </div>
                <div className={s.dishes}>
                    <div className={s.topicName}>
                        страви
                        <button onClick={() => getAllDishes()}>get all dishes in console</button>
                    </div>
                    <div className={s.dishesContainer}>
                        {allDishes && allDishes.map((dish, index) => <AdminMenuItem key={index} dish={dish} />)}
                    </div>
                </div>
            </div>
    );
}

export default AdminPage;