import React from "react";
import { useState } from "react";
import { createRef } from "react";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { Navigate } from "react-router";
import Popup from "reactjs-popup";
import { useAuth } from "../../utilites/firebase/auth";
import { addReceipt, getAllDishes, getCategories } from "../../utilites/firebase/firestore";
import { uploadImage } from "../../utilites/firebase/storage";
import { FileInput, Input, Select, Textarea } from "../../utilites/FormValidators/FormControls";
import { composeValidators, maxLengthCreator, required } from "../../utilites/FormValidators/validators";
import Preloader from "../common/Preloader";
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

    let file = {};
    let fileName = '';
    const setFileData = (target) => {
        const f = target.files[0];
        file = f;
        fileName = f.name;
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
                values.newDishPortion + " " + values.newDishPortionNominal,
                values.newDishAvailable === 'true' ? true : false,
                bucket);

        } catch (error) {
            props.onError(console.log(error));
        }
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
                        {categories.length === 0 ? <div className={s.preloaderContainer}><Preloader /></div> :
                        categories.map(category => <div key={category} className={s.category}>{category}</div>)}
                    </div>
                </div>
                <div className={s.dishes}>
                    <div className={`${s.topicName} ${s.dishesTopic}`}>
                        страви
                        <Popup trigger={<button> Trigger</button>} modal lockScroll closeOnDocumentClick={false}>
                            {close => (
                            
                            <div className={popup.newDishWindow}>
                                <button className={popup.closeButton} onClick={close} >
                                    x
                                </button>
                                <div className={popup.labelWindow}>
                                    Додати страву до списку
                                </div>
                                <div>
                                    <Form
                                        onSubmit={addNewDish}
                                        initialValues={{ employed: true }}
                                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                                            <form
                                                onSubmit={event => {
                                                    handleSubmit(event).then(form.reset);
                                                }}
                                                className={s.formWindow}
                                            >
                                                <div className={s.inputsContainer}>
                                                    <div className={s.inputImage}>
                                                        {//<input type="file" name="photo" accept=".jpg, .jpeg, .png"/>
                                                        }
                                                        <Field
                                                            name="newDishImage"
                                                            component={FileInput}
                                                            validate={required}
                                                            accept=".jpg, .jpeg, .png, .jfif"
                                                            takeFile={setFileData}
                                                        >
                                                        </Field>

                                                    </div>
                                                    <div className={s.inputCategory}>
                                                        <Field name="dishCategory" component={Select} validate={required} >
                                                            <option value="">-- Оберіть категорію --</option>
                                                            {categories.map(category => <option key={category} value={category}>{category}</option>)}

                                                        </Field>
                                                        
                                                    </div>
                                                    
                                                        <Field
                                                            name="newDishName"
                                                            component={Input}
                                                            type="text"
                                                            placeholder='назва'
                                                            validate={composeValidators(required, maxLength254)}
                                                        />
                                                        
                                                    
                                                    
                                                        <Field
                                                            name="newDishDescription"
                                                            component={Textarea}
                                                            type="text"
                                                            placeholder='опис'
                                                            validate={required}
                                                        />
                                                        
                                                    
                                                        <Field
                                                            name="newDishPrice"
                                                            component={Input}
                                                            type="number"
                                                            placeholder='ціна'
                                                            validate={required}
                                                        />
                                                        
                                                    <div className={s.inputsPortion}> 
                                                        <Field
                                                            name="newDishPortion"
                                                            component={Input}
                                                            type="text"
                                                            placeholder='порція'
                                                            validate={required}
                                                            inputname='portion'
                                                        />
                                                       
                                                        <Field
                                                            name="newDishPortionNominal"
                                                            component={Select}
                                                            validate={required}
                                                            inputname='nominal'
                                                        >
                                                            <option value="" default>-</option>
                                                            <option value="л.">л.</option>
                                                            <option value="г.">г.</option>
                                                            <option value="шт.">шт.</option>
                                                        </Field>
                                                    </div>
                                                    <div className={s.inputAvailable}>
                                                        <Field
                                                            name="newDishAvailable"
                                                            component={Input}
                                                            type="radio"
                                                            value='true'
                                                            id="availableChoise1"
                                                            validate={required}
                                                            labelRadio="Доступно"
                                                        />
                                            
                                                        <Field
                                                            name="newDishAvailable"
                                                            component={Input}
                                                            type="radio"
                                                            value='false'
                                                            id="availableChoise2"
                                                            validate={required}
                                                            labelRadio="Недоступно"
                                                        />
                                                        
                                                    </div>
                                                    {props.submitError && <div className={s.submitError}>{props.submitError}</div>}
                                                    <div className={s.buttonsContainer}>
                                                        <div className={s.buttonSubmit}>
                                                            {/*formDisabled ? <button type="submit" disabled>Додати</button> : <button type="submit">Додати</button>*/}
                                                            <button type="submit" disabled={submitting || pristine}>
                                                                Додати
                                                            </button>
                                                        </div>
                                                        <div className={s.buttonReset}>
                                                            <button
                                                                type="button"
                                                                onClick={form.reset}
                                                                disabled={submitting || pristine}
                                                            >
                                                                Очистити все
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    />
                                </div>
                            </div>
                            )}
                        </Popup>
                        {/*<div className={s.addNewDish} onClick={addNewDish}><p>+</p> Додати нову страву</div>*/}
                    </div>
                    <div className={s.dishesContainer}>
                        {allDishes.length === 0 ? <div className={s.preloaderContainer}><Preloader /></div> :
                        allDishes && allDishes.map((dish, index) => <AdminMenuItem key={index} dish={dish} />)}
                    </div>
                </div>
            </div>
    );
}

export default AdminPage;