import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { Navigate } from "react-router";
import Popup from "reactjs-popup";
import { useAuth } from "../../utilites/firebase/auth";
import { addReceipt, getAllDishes, getCategories } from "../../utilites/firebase/firestore";
import { getDownloadURL, uploadImage } from "../../utilites/firebase/storage";
import { FileInput, Input, Select, Textarea } from "../../utilites/FormValidators/FormControls";
import { composeValidators, maxLengthCreator, required } from "../../utilites/FormValidators/validators";
import Preloader from "../common/Preloader";
import AddDishPopup from "./popups/AddDishPopup";
import AdminMenuItem from "./AdminMenuItem";
import s from './AdminPage.module.css';

const AdminPage = (props) => {
    const maxLength254 = maxLengthCreator(254);
    const { authUser } = useAuth();
    const [categories, setCategories] = useState([]);
    const [allDishes, setAllDishes] = useState([]);
    const [addedDish, setAddedDish] = useState(null);
    const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

    const closeUpdatePopup = () => setOpenUpdatePopup(false);

    const toggleUpdatePopup = () => {
        !openUpdatePopup ? setOpenUpdatePopup(true) : setOpenUpdatePopup(false)
        console.log(openUpdatePopup)
    }

    const toggleDeletePopup = () => {
        !openDeletePopup ? setOpenDeletePopup(true) : setOpenDeletePopup(false)
    }

    useEffect(() => {
        async function fetchData() {
            await getCategories(setCategories);
            await getAllDishes(setAllDishes);
        }
        if (authUser) {
            return () => fetchData();
        }
    }, [authUser])

    useEffect(() => {
        addedDish && setTimeout(() => { setAddedDish(null) }, 3500)

    }, [addedDish])

    let file = {};
    let fileName = '';
    const setFileData = (target) => {
        const f = target.files[0];
        file = f;
        fileName = f.name;
    }
    const addedNotify = (dishName) => {
        setAddedDish(dishName);
        //setTimeout(setAddedDish(null), 3500)
    }
    const addNewDish = async values => {
        console.log(file)
        console.log(fileName)
        console.log(values)
        try {
            console.log(values)
            const bucket = await uploadImage(file, values.dishCategory);

            // Store data into Firestore
            await addReceipt(
                values.dishCategory,
                values.newDishName,
                values.newDishDescription,
                Number(values.newDishPrice),
                values.newDishPortion + ' ' + values.newDishPortionNominal,
                values.newDishAvailable === 'true' ? true : false,
                bucket,
                await getDownloadURL(bucket));
            await addedNotify(values.newDishName);

        } catch (error) {
            props.onError(console.log(error));
        }
    }
    return (
        !authUser ?
            <Navigate to={'/login'} />
            :
            <div className={`${s.adminPage} ${"container"}`}>
                {addedDish ?
                    <div className={s.addedNotify}>
                        <p>Страву "{addedDish}" успішно додано до меню</p>
                    </div>
                    : <></>}
                <div className={s.categories}>
                    <div className={s.topicName}>
                        категорії
                    </div>
                    <div className={s.categoriesContainer}>
                        {categories.length === 0 ? <div className={s.preloaderContainer}><Preloader /></div> :
                            categories.map(category => <div key={category} className={s.category}>{category}</div>)}
                    </div>
                </div>
                <div className={s.dishes}>
                    <div className={`${s.topicName} ${s.dishesTopic}`}>
                        страви
                        <Popup trigger={<button> Trigger</button>} modal lockScroll closeOnDocumentClick={false}>
                            {close => (
                                <AddDishPopup
                                    close={close}
                                    addNewDish={addNewDish}
                                    setFileData={setFileData}
                                    categories={categories}
                                />
                            )}
                        </Popup>
                    </div>
                    <div className={s.dishesContainer}>
                        {allDishes.length === 0 ? <div className={s.preloaderContainer}><Preloader /></div> :
                            allDishes && allDishes.map((dish, index) => <AdminMenuItem openUpdatePopup={openUpdatePopup} openDeletePopup={openDeletePopup} updatePopup={setOpenUpdatePopup} deletePopup={setOpenDeletePopup} key={dish.id} dish={dish} />)}
                    </div>
                </div>
            </div>
    );
}

export default AdminPage;