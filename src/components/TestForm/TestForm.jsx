import React, { useState } from "react";
import { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { Input } from "../../utilites/FormValidators/FormControls";
import { composeValidators, maxLengthCreator, required } from "../../utilites/FormValidators/validators";
import s from './TestForm.module.css';

const TestForm = (props) => {
    const DEFAULT_FILE_NAME = 'Файл не обрано';
    const DEFAULT_FORM_STATE = {
        fileName: DEFAULT_FILE_NAME,
        file: null,
        dishName: '',
        dishDescription: '',
        dishPrice: null,
        dishPortion: null,
        dishAvailable: null,
        date: null,
        imageBucket: "",
        imageUrl: "",
    };
    const maxLength254 = maxLengthCreator(254);
    
    const [formFields, setFormFields] = useState(DEFAULT_FORM_STATE);

    useEffect(() => {
        console.log('data changed');
    }, [formFields])
    const updateFormField = (event, field) => {
        setFormFields(prevState => ({...prevState, [field]: event.target.value}))
      }
    const setFileData = (target) => {
        const file = target.files[0];
        setFormFields(prevState => ({...prevState, file }));
        debugger;
        setFormFields(prevState => ({...prevState, fileName: file.name }))
        console.log('file !empty')
        debugger;
    }
    const addNewDish = () => {
        console.log(formFields);
    }


    return (<><Form onSubmit={addNewDish}>
        {props => (
            <form onSubmit={props.handleSubmit} className={s.formWindow}>
                <div className={s.inputsContainer}>
                    <div className={s.inputImage}>
                        <input type="file" name="photo" accept=".jpg, .jpeg, .png" onInput={(e) => {
                            debugger;
                            setFileData(e.target);
                            console.log(formFields)
                            }} 
                            
                            />
                        <Field
                            name="newDishImage"
                            component={Input}
                            type='file'
                            validate={required}
                            value={formFields.file}
                            accept=".jpg, .jpeg, .png"
                            onInput={(e) => {
                                debugger;
                                setFileData(e.target);
                                console.log(formFields)
                            }}

                        >
                        </Field>

                    </div>
                    <div className={s.inputName}>
                        <Field
                            name="newDishName"
                            component={Input}
                            type="text"
                            placeholder='Назва'
                            validate={composeValidators(required, maxLength254)}
                            onChange={(event) => updateFormField(event, 'dishName')}
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
                    {props.submitError && <div className={s.submitError}>{props.submitError}</div>}
                    <div className={s.buttonsContainer}>
                        <div className={s.buttonSubmit}>
                            <button type="submit">Додати</button>
                        </div>
                    </div>
                </div>
            </form>
        )}

    </Form>
    
    </>)
}

export default TestForm;