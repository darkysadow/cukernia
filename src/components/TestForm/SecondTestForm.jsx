import React, { useEffect } from "react";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import { useAuth } from "../../utilites/firebase/auth";
import { addReceipt, getCategories } from "../../utilites/firebase/firestore";
import { uploadImage } from "../../utilites/firebase/storage";
import { FileInput, Input } from "../../utilites/FormValidators/FormControls";
import { composeValidators, maxLengthCreator, required } from "../../utilites/FormValidators/validators";
import s from './TestForm.module.css';

const SecondTestForm = (props) => {


    const maxLength254 = maxLengthCreator(254);
    const { authUser } = useAuth();
    let file = {};
    let fileName = '';
    let formDisabled = false;
    const setFileData = (target) => {
        const f = target.files[0];
        file = f;
        fileName = f.name;
    }

    //categories for select to the add dish form
    const [categories, setCategories] = useState([])
    useEffect(() => {
        async function fetchData() {
            console.log('fetching');
            await getCategories(setCategories);
        }
        if (authUser) {
            return () => fetchData();
        }
    }, [authUser])
    const addNewDish = async (values) => {
        formDisabled = true;
        console.log(file)
        console.log(fileName)
        console.log(values)
        try {
            const bucket = await uploadImage(file, 'фронти');

            // Store data into Firestore
            await addReceipt(
                values.newDishName,
                values.newDishDescription,
                Number(values.newDishPrice),
                values.newDishPortion,
                values.newDishAvailable === 'true' ? true : false,
                bucket);

        } catch (error) {
            props.onError(console.log(error));
        }
    }


    return (
        authUser ?
            <><Form onSubmit={addNewDish}>
                {props => (
                    <form onSubmit={props.handleSubmit} className={s.formWindow}>
                        <div className={s.inputsContainer}>
                            <div className={s.inputImage}>
                                {//<input type="file" name="photo" accept=".jpg, .jpeg, .png"/>
                                }
                                <Field
                                    name="newDishImage"
                                    component={FileInput}
                                    validate={required}
                                    accept=".jpg, .jpeg, .png"
                                    takeFile={setFileData}
                                >
                                </Field>

                            </div>
                            <div className={s.inputCategory}>
                                <Field name="dishCategory" component="select" validate={required}>
                                    {//<option value="chicken">🐓 Chicken</option>
                                    }
                                    {categories.map(category => <option key={category} value={category}>{category}</option>)}

                                </Field>
                            </div>
                            <div className={s.inputName}>
                                <Field
                                    name="newDishName"
                                    component={Input}
                                    type="text"
                                    placeholder='Назва'
                                    validate={composeValidators(required, maxLength254)}
                                />
                            </div>
                            <div className={s.inputDescription}>
                                <Field
                                    name="newDishDescription"
                                    component={Input}
                                    type="text"
                                    placeholder='Опис'
                                    validate={required}
                                />
                            </div>
                            <div className={s.inputPrice}>
                                <Field
                                    name="newDishPrice"
                                    component={Input}
                                    type="number"
                                    placeholder='Ціна (в гривнях)'
                                    validate={required}
                                />
                            </div>
                            <div className={s.inputPortion}>
                                <Field
                                    name="newDishPortion"
                                    component={Input}
                                    type="text"
                                    placeholder='Порція (літри або грами)'
                                    validate={required}
                                />
                            </div>
                            <div className={s.inputAvailable}>
                                <Field
                                    name="newDishAvailable"
                                    component={Input}
                                    type="radio"
                                    value='true'
                                    id="availableChoise1"
                                    validate={required}
                                />
                                <label htmlFor="availableChoice1">Доступно</label>
                                <Field
                                    name="newDishAvailable"
                                    component={Input}
                                    type="radio"
                                    value='false'
                                    id="availableChoise2"
                                    validate={required}
                                />
                                <label htmlFor="availableChoice2">Недоступно</label>
                            </div>
                            {props.submitError && <div className={s.submitError}>{props.submitError}</div>}
                            <div className={s.buttonsContainer}>
                                <div className={s.buttonSubmit}>
                                    {formDisabled ? <button type="submit" disabled>Додати</button> : <button type="submit">Додати</button>}
                                </div>
                            </div>
                        </div>
                    </form>
                )}

            </Form>

            </> : <>Preloader</>)
}

export default SecondTestForm;