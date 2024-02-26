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
import { Button, createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";

//const maxLength254 = maxLengthCreator(254)

/*
const onSubmit = (values) => {
    signInWithEmailAndPassword(auth, )
}*/

const Login = (props) => {
    const navigate = useNavigate();
    const { authUser, isLoading } = useAuth();
    const [login, setLogin] = useState(false);
    const [formFields, setFormFields] = useState({ loginInput: '', passwordInput: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateFormField = (event, field) => {
        setFormFields(prevState => ({ ...prevState, [field]: event.target.value }))
    }

    useEffect(() => {
        console.log(authUser);
    }, [authUser])

    const isDisabled = () => formFields.loginInput.length === 0 || formFields.passwordInput.length === 0;

    /* const onSubmit = useCallback(
        async () => {
            setIsSubmitting(true);
            try {
                await signInWithEmailAndPassword(auth, formFields.loginInput, formFields.passwordInput)
                setIsSubmitting(false)
                setLogin(true)
                navigate('/admin')
            } catch(error) {
                setIsSubmitting(false)
                alert(error);
            }
            
        }, [navigate]
    ) */

    const onSubmit = async () => {
        setIsSubmitting(true);
        try {
            await signInWithEmailAndPassword(auth, formFields.loginInput, formFields.passwordInput)
            setLogin(true);
            navigate('/admin')
        } catch (error) {
            setIsSubmitting(false)
            alert(error);
        }
    }

    const theme = createTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: yellow[800],
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#6d1a1bcf',
            },
            textColor: {
                main: '#000'
            }
        },
    })
    return (
        authUser ?
            <Navigate to={'/admin'} />
            :
            <div className={`${s.adminPage} ${"container"}`}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4" className={s.label}>
                        Авторизація
                    </Typography>
                    <TextField size="small" id="filled-basic" label="Логін" variant="filled" value={!formFields.loginInput ? '' : formFields.loginInput} onChange={(e) => updateFormField(e, 'loginInput')} />
                    <TextField type='password' size="small" id="filled-basic" label="Пароль" variant="filled" value={!formFields.passwordInput ? '' : formFields.passwordInput} onChange={(e) => updateFormField(e, 'passwordInput')} />
                    {isSubmitting ?
                        <Button color="secondary" variant="contained" disabled={true}>
                            Авторизація...
                        </Button> :
                        <Button color="secondary" variant="contained" onClick={onSubmit} disabled={isDisabled()}>
                            Авторизуватися
                        </Button>}
                </ThemeProvider>
            </div>
    )
}

export default Login;