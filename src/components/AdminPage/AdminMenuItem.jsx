import React from "react";
import s from './AdminMenuItem.module.css';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import AddDishPopup from "./popups/AddDishPopup";
import UpdatePopup from "./popups/UpdatePopup";



const AdminMenuItem = (props) => {
    //const dish = props.dish;
    const {dish, openUpdatePopup, openDeletePopup, updatePopup, deletePopup, ...restProps} = props;


    return (<div className={s.adminMenuItem} key={props.key}>
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
            <div className={s.menuItemUpdate} onClick={updatePopup}>
                <FontAwesomeIcon icon={faPenToSquare} style={{color: '#3784ff'}}/>
                {/* <Popup open={openUpdatePopup} onClose={() => updatePopup(false)} modal lockScroll closeOnDocumentClick={false}>
                            {/* <div className="modal" style={{background: "#fff", padding: "20px", borderRadius: '5px', border: "1px solid black"}}>
                                <a className="close" onClick={() => updatePopup(false)} style={{cursor: 'pointer'}}>
                                    x
                                </a>
                                Update Popup
                            </div> 
                            <UpdatePopup 
                                popupName='Редагувати страву'
                                setUpdatePopupState={updatePopup}
                                dish={dish}
                            />
                        </Popup> */}
            </div>
            <div className={s.menuItemDelete} onClick={deletePopup}>
                <FontAwesomeIcon icon={faTrashCan} style={{color: '#ff3737'}}/>
                {/* <Popup open={openDeletePopup} onClose={() => deletePopup(false)} modal lockScroll closeOnDocumentClick={false}>
                            <div className="modal" style={{background: "#fff", padding: "20px", borderRadius: '5px', border: "1px solid black"}}>
                                <a className="close" onClick={() => deletePopup(false)} style={{cursor: 'pointer'}}>
                                    x
                                </a>
                                Delete Popup
                            </div>
                        </Popup> */}
            </div>
        </div>
    </div>)
}

export default AdminMenuItem;