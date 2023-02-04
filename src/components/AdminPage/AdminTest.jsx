import { Alert, Button, createTheme, Dialog, DialogActions, DialogContent, Divider, IconButton, Snackbar, ThemeProvider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../utilites/firebase/auth";
import { deleteDish, getAllDishes, getCategories } from "../../utilites/firebase/firestore";
import { deleteImage } from "../../utilites/firebase/storage";
import PagePreloader from "../common/PagePreloader";
import Preloader from "../common/Preloader";
import AdminMenuItem from "./AdminMenuItem";
import s from "./AdminPage.module.css";
import is from './AdminMenuItem.module.css';
import styles from './DishDialog.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import DishDialog from "./DishDialog";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { purple, yellow } from "@mui/material/colors";


const ADD_SUCCESS = 'Страву успішно додано до списку';
const ADD_ERROR = 'Помилка. Страву не додано до списку';
const EDIT_SUCCESS = 'Дані про страву успішно змінено';
const EDIT_ERROR = 'Помилка. Дані про старву не змінено';
const DELETE_SUCCESS = 'Страву успішно видалено зі списку';
const DELETE_ERROR = 'Помилка.';

export const DISHES_ENUM = Object.freeze({
    none: 0,
    add: 1,
    edit: 2,
    delete: 3
});

const SUCCESS_MAP = {
    [DISHES_ENUM.add]: ADD_SUCCESS,
    [DISHES_ENUM.edit]: EDIT_SUCCESS,
    [DISHES_ENUM.delete]: DELETE_SUCCESS
}

const ERROR_MAP = {
    [DISHES_ENUM.add]: ADD_ERROR,
    [DISHES_ENUM.edit]: EDIT_ERROR,
    [DISHES_ENUM.delete]: DELETE_ERROR
}

const AdminTest = (props) => {
    const { authUser, isLoading } = useAuth();
    const [action, setAction] = useState(DISHES_ENUM.none);

    //State involved in loading, setting, deleting and updating dishes
    const [isLoadingDishes, setIsLoadingDishes] = useState(true);
    const [deleteDishId, setDeleteDishId] = useState('');
    const [deleteDishImageBucket, setDeleteDishImageBucket] = useState('');
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [updateDish, setUpdateDish] = useState({});

    //State involved in snackbar
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

    //Listen authUser and isLoading, redirect if needed
    useEffect(() => {
        if (!isLoading && !authUser) {
            console.log('redirect')
        }
    }, [authUser, isLoading])

    //Get dishes once if user logged in
    /*  useEffect(() => {
         if (authUser) {
             async function unsubscribe() {await getAllDishes(setDishes, setIsLoadingDishes);}
             return () => unsubscribe();
         }
     }, [authUser]); */
    useEffect(() => {
        async function fetchData() {
            await getCategories(setCategories);
            await getAllDishes(setDishes, setIsLoadingDishes);

        }
        if (authUser) {
            fetchData();
        }
    }, [authUser])

    //Sets appropriate snackbar message or whether @isSuccess and updates shown dishes if necessary
    const onResult = async (dishEnum, isSuccess) => {
        setSnackbarMessage(isSuccess ? SUCCESS_MAP[dishEnum] : ERROR_MAP[dishEnum]);
        isSuccess ? setShowSuccessSnackbar(true) : setShowErrorSnackbar(true);
        isSuccess && await getAllDishes(setDishes, setIsLoadingDishes);
        setAction(DISHES_ENUM.none);
    }

    //onClick event handlers
    const onClickAdd = () => {
        setAction(DISHES_ENUM.add);
        setUpdateDish({});
    }

    const onUpdate = (dish) => {
        setAction(DISHES_ENUM.edit);
        setUpdateDish(dish);
    }

    const onClickDelete = (id, imageBucket) => {
        setAction(DISHES_ENUM.delete);
        setDeleteDishId(id);
        setDeleteDishImageBucket(imageBucket);
    }

    const resetDelete = () => {
        setAction(DISHES_ENUM.none);
        setDeleteDishId('');
    }

    const onDelete = async () => {
        let isSucceed = true;
        try {
            await deleteDish(deleteDishId);
            await deleteImage(deleteDishImageBucket);
        } catch (error) {
            isSucceed = false;
        }
        resetDelete();
        onResult(DISHES_ENUM.delete, isSucceed);
    }

    const theme = createTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: yellow[800],
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#11cb5f',
            },
            textColor: {
                main: '#000'
            }
        },
    })

    return (
        (!authUser && isLoadingDishes) ?
            <PagePreloader />
            :
            <div>
                <div className="container">
                    <div className={s.pageTopping}>
                        Адмін панель
                    </div>
                    <ThemeProvider theme={theme}>
                        <Snackbar open={showSuccessSnackbar}
                            autoHideDuration={1500}
                            onClose={() => setShowSuccessSnackbar(false)}
                            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                            <Alert onClose={() => setShowSuccessSnackbar(false)} severity="success">
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={showErrorSnackbar}
                            autoHideDuration={1500}
                            onClose={() => setShowErrorSnackbar(false)}
                            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                            <Alert onClose={() => setShowErrorSnackbar(false)} severity="error">
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                        <Stack direction="row" sx={{ paddingTop: "1.5em" }} className={styles.topping}>
                            <Typography variant="h4" sx={{ lineHeight: 2, paddingRight: "0.5em" }}>
                                Страви
                            </Typography>
                            {/* <IconButton aria-label="edit" color="primary" onClick={onClickAdd} className={s.addButton}>
                                <AddBoxIcon />Додати
                            </IconButton> */}
                            <button onClick={onClickAdd} className={styles.addButton}><h4>Додати</h4> <AddBoxIcon /></button>
                        </Stack>
                        <div className={s.dishesContainer}>
                            {dishes.length === 0 ? <Preloader /> :
                                dishes && dishes.map((dish) => (
                                    <div className={is.adminMenuItem} key={dish.id}>
                                        {!dish.available && <div className={is.unavailable}></div>}
                                        <div className={is.menuItemBlur}></div>
                                        <div className={is.menuItemImage}>
                                            <img src={dish.imageURL} alt="" />
                                        </div>
                                        <div className={is.menuItemNameDescription}>
                                            <div className={is.menuItemName}>
                                                {dish.dishName}
                                            </div>
                                            <div className={is.menuItemDescription}>
                                                {dish.description}
                                            </div>
                                        </div>
                                        <div className={is.menuItemPricePortion}>
                                            <div className={is.menuItemPrice}>
                                                {dish.price} ₴
                                            </div>
                                            <div className={is.menuItemPortion}>
                                                {dish.portion + " " + dish.portionNominal}
                                            </div>
                                        </div>
                                        <div className={is.menuItemAvailable}>
                                            {dish.available === "true" ? 'Доступно' : 'Недоступно'}
                                        </div>
                                        <div className={is.menuItemControls}>
                                            <div className={is.menuItemUpdate} onClick={() => onUpdate(dish)}>
                                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: '#3784ff' }} />
                                            </div>
                                            <div className={is.menuItemDelete} onClick={() => onClickDelete(dish.id, dish.imageBucket)}>
                                                <FontAwesomeIcon icon={faTrashCan} style={{ color: '#ff3737' }} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </ThemeProvider>
                </div>
                <DishDialog edit={updateDish}
                    showDialog={action === DISHES_ENUM.add || action === DISHES_ENUM.edit}
                    onError={(dishEnum) => onResult(dishEnum, false)}
                    onSuccess={(dishEnum) => onResult(dishEnum, true)}
                    onCloseDialog={() => setAction(DISHES_ENUM.none)}
                    categories={categories} />

            </div>

    )
}

export default AdminTest;