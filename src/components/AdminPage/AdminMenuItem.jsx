import React from "react";
import s from './AdminMenuItem.module.css';

const AdminMenuItem = (props) => {
    const dish = props.dish;
    return (<div className={s.adminMenuItem}>
        <div className={s.leftHalf}>
            <div className={s.menuItemImage}>
                <img src={dish.imageURL} alt="" />
            </div>
            <div className={s.menuItemNameDescription}>
                <div className={s.menuItemName}>
                    <p>Назва:</p>
                    {dish.dishName}
                </div>
                <div className={s.menuItemDescription}>
                    <p>Опис:</p>
                    {dish.description}
                </div>
            </div>
        </div>
        <div className={s.rightHalf}>
        <div className={s.menuItemPricePortion}>
            <div className={s.menuItemPrice}>
                Ціна: {dish.price} ₴
            </div>
            <div className={s.menuItemPortion}>
                Порція: {dish.portion}
            </div>
        </div>
        <div className={s.menuItemAvailable}>
            {dish.available ? 'Доступно' : 'Недоступно'}
        </div>
        <div className={s.menuItemControls}>
            <div className={s.menuItemUpdate}>U</div>
            <div className={s.menuItemDelete}>D</div>
        </div>
        </div>
    </div>)
}

export default AdminMenuItem;