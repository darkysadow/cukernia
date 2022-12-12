import React, { useEffect } from "react";
import { Field, Form } from "react-final-form";
import { Input } from "../../utilites/FormValidators/FormControls";
import { composeValidators, maxLengthCreator, required } from "../../utilites/FormValidators/validators";
import s from './Login.module.css';
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../utilites/firebase/firebase";
import { useCallback } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../../utilites/firebase/auth";
import { useHistory } from 'react-router-dom';

const maxLength254 = maxLengthCreator(254)

/*
const onSubmit = (values) => {
    signInWithEmailAndPassword(auth, )
}*/

const Login = (props) => {
    const navigate = useNavigate();
    const { authUser, isLoading } = useAuth();
    const [ login, setLogin] = useState(false);
    console.log(authUser)
    const onSubmit = useCallback(
        async event => {
            console.log(event)
            const {loginInputLogin, passwordInputLogin} = event;
            try {
                await signInWithEmailAndPassword(auth, loginInputLogin, passwordInputLogin)
                setLogin(true)
                navigate('/admin')
                
            } catch(error) {
                alert(error);
            }
        }, [navigate]
    )
    return (
        authUser ?
        <Navigate to={'/admin'}  />
        :
        <div className={`${s.adminPage} ${"container"}`}>
            <Form onSubmit={onSubmit}>
                {props => (
                    <form onSubmit={props.handleSubmit} className={s.loginForm}>
                        <div className={s.label}><p>Увійдіть до системи</p></div>
                        <div className={s.inputsContainer}>
                            <div className={s.inputLogin}>
                                <Field
                                    name="loginInputLogin"
                                    component={Input}
                                    type="email"
                                    placeholder='Email'
                                    validate={composeValidators(required, maxLength254)}
                                />
                            </div>
                            <div className={s.inputPassword}>
                                <Field
                                    name="passwordInputLogin"
                                    component={Input}
                                    type="password"
                                    placeholder='Password'
                                    validate={required}
                                />
                            </div>
                            <div className={s.checkboxRemember}>
                                <Field
                                    name="checkboxLogin"
                                    component="input"
                                    type="checkbox"
                                />
                                <p>Запам'ятати мене</p>
                            </div>
                            {props.submitError && <div className={s.submitError}>{props.submitError}</div>}
                            <div className={s.buttonsContainer}>
                                <div className={s.buttonLogin}>
                                    <button type="submit">Увійти</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

            </Form>
        </div>
    )
}

export default Login;