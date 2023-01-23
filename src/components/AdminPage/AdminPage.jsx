import React from "react";
import { useState } from "react";
import { createRef } from "react";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { Navigate } from "react-router";
import Popup from "reactjs-popup";
import { useAuth } from "../../utilites/firebase/auth";
import { getAllDishes, getCategories } from "../../utilites/firebase/firestore";
import { uploadImage } from "../../utilites/firebase/storage";
import { Input } from "../../utilites/FormValidators/FormControls";
import { composeValidators, maxLengthCreator, required } from "../../utilites/FormValidators/validators";
import AdminMenuItem from "./AdminMenuItem";
import s from './AdminPage.module.css';
import popup from './Popup.module.css';

const AdminPage = (props) => {
    const maxLength254 = maxLengthCreator(254);
    const photoInputRef = createRef();
    const { authUser } = useAuth();
    const [categories, setCategories] = useState([]);
    const [allDishes, setAllDishes] = useState([]);
    const [formFields, setFormFields] = useState({ file: null, fileName: '' });
    useEffect(() => {
        async function fetchData() {
            await getCategories(setCategories);
            await getAllDishes(setAllDishes);
        }
        if (authUser) {
            return () => fetchData();
        }
    }, [authUser])

    const setFileData = (target) => {
        const file = target.files[0];
        console.log(target.files[0]);
        setFormFields(prevState => ({ ...prevState, file }));

    }
    const addNewDish = async (e) => {
        await uploadImage(formFields.file, 'чай порційний');
        console.log('form submitted with: ', e, "ref:", photoInputRef.current)
    }
    return (
        !authUser ?
            <Navigate to={'/login'} />
            :
            <div className={`${s.adminPage} ${"container"}`}>
                <div className={s.categories}>
                    <div className={s.topicName}>
                        категорії
                    </div>
                    <div className={s.categoriesContainer}>
                        {categories.map(category => <div key={category} className={s.category}>{category}</div>)}
                    </div>
                </div>
                <div className={s.dishes}>
                    <div className={`${s.topicName} ${s.dishesTopic}`}>
                        страви
                        <Popup trigger={<button> Trigger</button>} modal>
                            <div className={popup.newDishWindow}>
                                <div className={popup.labelWindow}>
                                    Додати страву до списку
                                </div>
                                <Form onSubmit={addNewDish}>
                                    {props => (
                                        <form onSubmit={props.handleSubmit} className={popup.formWindow}>
                                            <div className={popup.inputsContainer}>
                                                <div className={popup.inputImage}>
                                                    <input type="file" name="photo" accept=".jpg, .jpeg, .png" onInput={(e) => setFileData(e.target)} />
                                                    <Field
                                                        name="newDishImage"
                                                        component={Input}
                                                        type='file'
                                                        validate={required}
                                                        accept=".jpg, .jpeg, .png"
                                                        onInput={(e) => {
                                                            const file = e.target.files[0];
                                                            console.log(file);
                                                            console.log(formFields)
                                                        }}
                                                        ref={photoInputRef}
                                                    >
                                                    </Field>
                                                    
                                                </div>
                                                <div className={popup.inputName}>
                                                    <Field
                                                        name="newDishName"
                                                        component={Input}
                                                        type="text"
                                                        placeholder='Назва'
                                                        validate={composeValidators(required, maxLength254)}
                                                    />
                                                </div>
                                                <div className={popup.inputDescription}>
                                                    <Field
                                                        name="newDishDescription"
                                                        component={Input}
                                                        type="text"
                                                        placeholder='Опис'
                                                        validate={required}
                                                    />
                                                </div>
                                                <div className={popup.inputPrice}>
                                                    <Field
                                                        name="newDishPrice"
                                                        component={Input}
                                                        type="number"
                                                        placeholder='Ціна (в гривнях)'
                                                        validate={required}
                                                    />
                                                </div>
                                                <div className={popup.inputPortion}>
                                                    <Field
                                                        name="newDishPortion"
                                                        component={Input}
                                                        type="text"
                                                        placeholder='Порція (літри або грами)'
                                                        validate={required}
                                                    />
                                                </div>
                                                <div className={popup.inputAvailable}>
                                                    <Field
                                                        name="newDishAvailable"
                                                        component={Input}
                                                        type="radio"
                                                        value="availableTrue"
                                                        id="availableChoise1"
                                                        validate={required}
                                                    />
                                                    <label htmlFor="availableChoice1">Доступно</label>
                                                    <Field
                                                        name="newDishAvailable"
                                                        component={Input}
                                                        type="radio"
                                                        value="availableFalse"
                                                        id="availableChoise2"
                                                        validate={required}
                                                    />
                                                    <label htmlFor="availableChoice2">Недоступно</label>
                                                </div>
                                                {props.submitError && <div className={popup.submitError}>{props.submitError}</div>}
                                                <div className={popup.buttonsContainer}>
                                                    <div className={popup.buttonSubmit}>
                                                        <button type="submit">Додати</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Form>
                            </div>
                        </Popup>
                        {/*<div className={s.addNewDish} onClick={addNewDish}><p>+</p> Додати нову страву</div>*/}
                    </div>
                    <div className={s.dishesContainer}>
                        {allDishes && allDishes.map((dish, index) => <AdminMenuItem key={index} dish={dish} />)}
                    </div>
                </div>
            </div>
    );
}

export default AdminPage;