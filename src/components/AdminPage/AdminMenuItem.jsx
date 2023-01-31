import React from "react";
import s from './AdminMenuItem.module.css';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminMenuItem = (props) => {
    const dish = props.dish;
    return (<div className={s.adminMenuItem}>
        {!dish.available && <div className={s.unavailable}></div>}
        <div className={s.menuItemBlur}></div>
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
                {dish.portion}
            </div>
        </div>
        <div className={s.menuItemAvailable}>
            {dish.available ? 'Доступно' : 'Недоступно'}
        </div>
        <div className={s.menuItemControls}>
            <div className={s.menuItemUpdate}>
                <FontAwesomeIcon icon={faPenToSquare} style={{color: '#3784ff'}}/>
            </div>
            <div className={s.menuItemDelete}>
                <FontAwesomeIcon icon={faTrashCan} style={{color: '#ff3737'}}/>
            </div>
        </div>
    </div>)
}

export default AdminMenuItem;