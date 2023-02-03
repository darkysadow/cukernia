import React from "react";
import popup from './Popup.module.css';

const UpdatePopup = (props) => {
    const {popupName, setUpdatePopupState, dish, ...restProps} = props;
    console.log(dish);
    return (
        <div className={`${popup.updateDishWindow} ${popup.popupWindow}`}>
            <div className={popup.labelWindow}>
                {popupName}
            </div>
            <button className={popup.closeButton} onClick={() => setUpdatePopupState(false)}>
                x
            </button>
        </div>
    );
}

export default UpdatePopup;