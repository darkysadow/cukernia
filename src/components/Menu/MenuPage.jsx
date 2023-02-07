import React, { useState } from "react";
import { useEffect } from "react";
import { getMenuCategories, getSelectedCategoryMenu } from "../../utilites/firebase/firestore";
import s from './MenuPage.module.css';
import Preloader from './../common/Preloader';

const MenuPage = (props) => {
    const [categories, setCategories] = useState([]);
    const [selectedMenuCategory, setSelectedMenuCategory] = useState(null);
    const [selectedMenuSubcategories, setSelectedMenuSubcategories] = useState(null);
    const [menu, setMenu] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await getMenuCategories(setCategories, setSelectedMenuCategory);

        }
        if (categories.length === 0) {
            fetchData();
        }
    }, [categories])

    useEffect(() => {

        async function fetchData() {
            setIsFetching(true);
            let searchDishes = [];
            let categoryId = categories.find(category =>
                category.name === selectedMenuCategory
            );
            if (categoryId.subcategories) {
                categoryId.subcategories.map(subcategory => {
                    searchDishes.push(
                        subcategory
                    )
                })
                setSelectedMenuSubcategories(categoryId.subcategories);
            } else {
                searchDishes.push(categoryId.name);
                setSelectedMenuSubcategories([categoryId.name]);
            }
            await getSelectedCategoryMenu(searchDishes, setMenu);
            setIsFetching(false)
        }
        categories.length !== 0 && fetchData();

    }, [selectedMenuCategory])

    /*     useEffect(() => {
            console.log(selectedMenuSubcategories)
        }, [selectedMenuSubcategories]) */

    return (
        <div className={`${s.menuPage} ${'container'}`}>
            <div className={s.categoryColumn}>
                <h3>Меню:</h3>
                {categories.length === 0 ? (<div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><Preloader size={2} /></div>) : categories.map((category, index) => (
                    <div key={index} className={s.menuCategory}>
                        <div onClick={() => {
                            setSelectedMenuCategory(category.name);
                            if (category.subcategories) {
                                setSelectedMenuSubcategories(category.subcategories);
                            } else {
                                setSelectedMenuSubcategories([category.name])
                            }
                        }} className={category.name === selectedMenuCategory ? `${s.activeCategory} ${s.menuCategoryName}` : s.menuCategoryName}>{category.name}</div>
                        {category.name === selectedMenuCategory &&
                            (category.subcategories ? category.subcategories.map(subcategory => (
                                <div key={subcategory}
                                    className={selectedMenuSubcategories && selectedMenuSubcategories.includes(subcategory) ? s.menuSubcategoryActive : s.menuSubcategory}
                                    onClick={() => {setIsFetching(true); setSelectedMenuSubcategories([subcategory]); setIsFetching(false)}}

                                >{subcategory}</div>
                            ))
                                :
                                <div className={selectedMenuSubcategories && selectedMenuSubcategories.includes(category.name) ? s.menuSubcategoryActive : s.menuSubcategory} >{category.name}</div>)
                        }
                    </div>
                ))}
            </div>
            <div className={s.menuContainerColumn}>
                {isFetching ? <div><Preloader size={5} /></div> :
                    (selectedMenuSubcategories && selectedMenuSubcategories.length !== 0) && selectedMenuSubcategories.map((subcategory, index) => (
                        <div key={index}>
                            <div className={s.subcategoryLabel}>{subcategory}</div>
                            <div className={s.dishesContainer}>
                                {menu.filter(dish => dish.category === subcategory).sort(
                                    function (a, b) {
                                        if(a.available > b.available) {
                                            return -1;
                                        }
                                        if(a.available < b.available) {
                                            return 1;
                                        }
                                        return 0;
                                    }).map((dish, index) => (
                                    <div key={index} className={s.menuItem}>
                                        {dish.available === "false" && <div className={s.unavailable}></div>}

                                        <div className={s.menuItemImage}>
                                            <img src={dish.imageURL} alt="" />
                                        </div>
                                        <div className={s.menuItemNameDescription}>
                                            <div className={s.menuItemName}>
                                                {dish.dishName}
                                            </div>
                                            <div className={s.menuItemDescription}>
                                                {dish.description}
                                            </div>
                                        </div>
                                        <div className={s.menuItemPricePortion}>
                                            <div className={s.menuItemPrice}>
                                                {dish.price} ₴
                                            </div>
                                            <div className={s.menuItemPortion}>
                                                {dish.portion + " " + dish.portionNominal}
                                            </div>
                                        </div>
                                        <div className={s.menuItemAvailable}>
                                            {dish.available === "true" ? 'Доступно' : 'Недоступно'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default MenuPage;

/*
categories.length !== 0 && categories.find(category => category.name === selectedMenuCategory).subcategories ?
                        categories.length !== 0 && categories.find(category => category.name === selectedMenuCategory).subcategories.map((subcategory, index) => (
                            <div key={index}>
                                {subcategory}
                                <div className={s.dishesContainer}>
                                    {menu.filter(dish => dish.category === subcategory).map((dish, index) => (
                                        <div key={index} className={s.menuItem}>
                                            {dish.available === "false" && <div className={s.unavailable}></div>}

                                            <div className={s.menuItemImage}>
                                                <img src={dish.imageURL} alt="" />
                                            </div>
                                            <div className={s.menuItemNameDescription}>
                                                <div className={s.menuItemName}>
                                                    {dish.dishName}
                                                </div>
                                                <div className={s.menuItemDescription}>
                                                    {dish.description}
                                                </div>
                                            </div>
                                            <div className={s.menuItemPricePortion}>
                                                <div className={s.menuItemPrice}>
                                                    {dish.price} ₴
                                                </div>
                                                <div className={s.menuItemPortion}>
                                                    {dish.portion + " " + dish.portionNominal}
                                                </div>
                                            </div>
                                            <div className={s.menuItemAvailable}>
                                                {dish.available === "true" ? 'Доступно' : 'Недоступно'}
                                            </div>
                                        </div>
                                    ))}</div>
                            </div>
                        )) :
                        <div>
                            <div>{selectedMenuCategory}</div>
                            <div className={s.dishesContainer}>
                                {menu.filter(dish => dish.category === selectedMenuCategory).map((dish, index) => (
                                    <div key={index} className={s.menuItem}>
                                        {dish.available === "false" && <div className={s.unavailable}></div>}

                                        <div className={s.menuItemImage}>
                                            <img src={dish.imageURL} alt="" />
                                        </div>
                                        <div className={s.menuItemNameDescription}>
                                            <div className={s.menuItemName}>
                                                {dish.dishName}
                                            </div>
                                            <div className={s.menuItemDescription}>
                                                {dish.description}
                                            </div>
                                        </div>
                                        <div className={s.menuItemPricePortion}>
                                            <div className={s.menuItemPrice}>
                                                {dish.price} ₴
                                            </div>
                                            <div className={s.menuItemPortion}>
                                                {dish.portion + " " + dish.portionNominal}
                                            </div>
                                        </div>
                                        <div className={s.menuItemAvailable}>
                                            {dish.available === "true" ? 'Доступно' : 'Недоступно'}
                                        </div>
                                    </div>
                                ))}</div>
                        </div>
*/



/* working 

<>
                        {(categories.length !== 0 && categories.find(category => category.name === selectedMenuCategory)) &&
                            !(categories.find(category => category.name === selectedMenuCategory).subcategories)
                            ?
                            <div className={s.dishesContainer}>
                                <div>{categories.find(category => category.name === selectedMenuCategory).name}</div>
                            </div>
                            :
                            categories.length !== 0
                            &&
                            categories.find(category => category.name === selectedMenuCategory).subcategories.map((subcategory, index) => (
                                <div key={index}>{subcategory}</div>
                            ))
                        }
                    </>

*/