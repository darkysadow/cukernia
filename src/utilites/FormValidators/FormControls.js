import React from "react";
import s from './FormControls.module.css';

const FormControls = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + ' ' + (hasError?s.error:'')}>
            <div className={s.inputElement}>
                {props.children}
                {hasError && <div className={s.errorText}><span>{meta.error}</span></div>}
            </div>
            
            
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (<FormControls {...props}>
        <textarea {...input} {...restProps}/>
    </FormControls>)
}

export  const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (<FormControls {...props}>
        <input {...input} {...restProps}/>
    </FormControls>)
}