import React, { useEffect, useState } from "react";
import LoadableImage from "../common/LoadableImage";
import Preloader from "../common/Preloader";
import s from './MenuItem.module.css';

const MenuItem = (props) => {
    const {dish, subcategory, ...restProps} = props;
    const [imageLoaded, setImageLoaded] = useState(false)
   
    return (<div className={s.menuItem}>
        {dish.available === "false" && <div className={s.unavailable}></div>}

        {/* <div className={s.menuItemImage}>
            {/* {!url ? <Preloader size={2} /> :  
            <img src={dish.imageURL} loading='lazy' alt="" />
            {/* } 
        </div> */}
        <LoadableImage src={dish.imageURL} alt={dish.dishName} />
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
    </div>)
}

export default MenuItem;