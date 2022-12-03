import { FORM_ERROR } from "final-form";
import React from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { Input } from "../../utilites/FormValidators/FormControls";
import { composeValidators, maxLengthCreator, required } from "../../utilites/FormValidators/validators";
import s from './AdminPage.module.css';

class AdminPage extends React.Component {

    maxLength254 = maxLengthCreator(254)

    onSubmit = (values) => {
    }

    render() {
        return (
            <div className={`${s.adminPage} ${"container"}`}>
                <Form onSubmit={this.onSubmit}>
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
                                        validate={composeValidators(required, this.maxLength254)}
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
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {})(AdminPage)