import React from "react";
import s from './MenuItem.module.css';

const MenuItem = (props) => {
    const dishInformation = props.document;
    return (<div className={s.menuItemContainer}>
        <div className={s.menuItem}>
            <div className={s.menuItemImageBlock}>
                <img src={dishInformation.imageURL} alt="" />
            </div>
            <div className={dishInformation.available?s.menuItemTextBlock:s.menuItemTextBlockUnavailable}>
                <div className={s.menuItemName}>
                    {dishInformation.dishName}
                </div>
                <div className={s.menuItemPricePortion}>
                    <div className={s.menuItemPrice}>
                        {dishInformation.price + ' ₴'}
                    </div>
                    <div className={s.menuItemPortion}>
                        {dishInformation.available?dishInformation.portion:'Недоступно'}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default MenuItem;