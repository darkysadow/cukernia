import React, { useState } from "react";
import { useEffect } from "react";
import { getCategories, getSelectedCategoryMenu } from "../../utilites/firebase/firestore";
import MenuItem from "./MenuItem";
import s from './MenuPage.module.css';

const MenuPage = (props) => {
    const [categories, setCategories] = useState([]);
    const [selectedMenuCategory, setSelectedMenuCategory] = useState(null);
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await getCategories(setCategories);
        }
        if (categories) {
            return () => fetchData();
        }
    }, [categories])

    useEffect(() => {
        async function fetchData() {
            await getSelectedCategoryMenu(selectedMenuCategory, setMenu)
        }
        fetchData();
    }, [selectedMenuCategory])
    return (
        <div className={`${s.menuPage} ${'container'}`}>
            <p>Категорії</p>
            <div className={s.menuCategories}>
                {categories.map(category => 
                <div 
                    key={category}
                    className={category === selectedMenuCategory ? `${s.activeCategory} ${s.category}` : s.category}
                    onClick={() => setSelectedMenuCategory(category)}
                >
                        {category}
                </div>)}
            </div>
            <div className={s.menuContainer}>
                    {menu.map((menuItem, index) => <MenuItem key={index} document={menuItem} />)}
            </div>
        </div>
    )
}

export default MenuPage;