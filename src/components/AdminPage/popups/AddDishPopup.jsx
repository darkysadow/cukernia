import React from "react";
import { Field, Form } from "react-final-form";
import { FileInput, Input, Select, Textarea } from "../../../utilites/FormValidators/FormControls";
import { composeValidators, maxLengthCreator, required } from "../../../utilites/FormValidators/validators";
import popup from './Popup.module.css';
import s from './AddDishPopup.module.css';

const AddDishPopup = (props) => {
    const { close, addNewDish, setFileData, categories, ...restProps} = props;
    const maxLength254 = maxLengthCreator(254);
    return (
        <div className={`${popup.newDishWindow} ${popup.popupWindow}`}>
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
                    render={({ handleSubmit, form, submitting, pristine}) => (
                        <form
                            onSubmit={event => {
                                handleSubmit(event).then(form.reset).then(form.restart);

                            }}
                            className={s.formWindow}
                        >
                            <div className={s.inputsContainer}>
                                <div className={s.inputImage}>
                                    <Field
                                        name="newDishImage"
                                        component={FileInput}
                                        validate={required}
                                        accept=".jpg, .jpeg, .png, .jfif"
                                        takeFile={setFileData}
                                        disabled={submitting}
                                    >
                                    </Field>
                                </div>
                                <div className={s.inputCategory}>
                                    <Field
                                        name="dishCategory"
                                        component={Select}
                                        validate={required}
                                        disabled={submitting}
                                    >
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
                                    disabled={submitting}
                                />
                                <Field
                                    name="newDishDescription"
                                    component={Textarea}
                                    type="text"
                                    placeholder='опис'
                                    validate={required}
                                    disabled={submitting}
                                />


                                <Field
                                    name="newDishPrice"
                                    component={Input}
                                    type="number"
                                    placeholder='ціна'
                                    validate={required}
                                    disabled={submitting}
                                />

                                <div className={s.inputsPortion}>
                                    <Field
                                        name="newDishPortion"
                                        component={Input}
                                        type="text"
                                        placeholder='порція'
                                        validate={required}
                                        inputname='portion'
                                        disabled={submitting}
                                    />

                                    <Field
                                        name="newDishPortionNominal"
                                        component={Select}
                                        validate={required}
                                        inputname='nominal'
                                        disabled={submitting}
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
                                        disabled={submitting}
                                    />

                                    <Field
                                        name="newDishAvailable"
                                        component={Input}
                                        type="radio"
                                        value='false'
                                        id="availableChoise2"
                                        validate={required}
                                        labelRadio="Недоступно"
                                        disabled={submitting}
                                    />

                                </div>
                                {props.submitError && <div className={s.submitError}>{props.submitError}</div>}
                                <div className={s.buttonsContainer}>
                                    <div className={s.buttonSubmit}>
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
    )
}

export default AddDishPopup;