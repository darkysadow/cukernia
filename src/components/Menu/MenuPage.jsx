import React, { useState } from "react";
import { useEffect } from "react";
import { getCategories, getMenuCategories, getSelectedCategoryMenu } from "../../utilites/firebase/firestore";
import MenuItem from "./MenuItem";
import s from './MenuPage.module.css';

const MenuPage = (props) => {
    const [categories, setCategories] = useState([]);
    const [selectedMenuCategory, setSelectedMenuCategory] = useState(null);
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await getMenuCategories(setCategories);
        }
        if (categories) {
            fetchData();
        }
    }, [categories])

    /* useEffect(() => {
        async function fetchData() {
            await getSelectedCategoryMenu(selectedMenuCategory, setMenu)
        }
        fetchData();
    }, [selectedMenuCategory]) */
    return (
        <div className={`${s.menuPage} ${'container'}`}>
            <div className={s.categoryColumn}>
                <h3>Меню:</h3>
                {categories && categories.map((category, index) => (
                    <div key={index} style={{padding: '3px 0', transition: '.5s'}}>
                        <div onClick={() => setSelectedMenuCategory(category.name)}>{category.name}</div>
                        {category.name === selectedMenuCategory && 
                        (category.subcategories ? category.subcategories.map(subcategory => (
                            <div key={subcategory} style={{padding: '0 0 0 20px', transition: '.5s'}}>{subcategory}</div>
                        ))
                        :
                        <div style={{padding: '0 0 0 20px'}}>{category.name}</div>)
                    }
                    </div>
                ))}
            </div>
            <div className={s.menuContainerColumn}>

            </div>
            <div className={s.menuSearchColumn}>

            </div>
        </div>
    )
}

export default MenuPage;

/*
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
*/