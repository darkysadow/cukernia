import React from "react";
import s from './FormControls.module.css';

/*const FormControls = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formControl + ' ' + (hasError?s.error:'')}>
            <div className={s.inputElement}>
                {props.children}
                {hasError && <div className={s.errorText}><span>{meta.error}</span></div>}
            </div>
            
            
        </div>
    )
}*/

const FormControls = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
            <div className={s.inputElement + ' ' + (hasError?s.error:'')}>
                {props.children}
                {hasError && <span className={s.errorText}>{meta.error}</span>}
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
    const {input, meta, child, placeholder, labelRadio, ...restProps} = props;
    return (<FormControls {...props}>
        <input {...input} {...restProps} required='required'/>
        {placeholder && <span className={s.placeholder}>{placeholder}</span>}
        {labelRadio && <p>{labelRadio}</p>}
    </FormControls>)
}

export const FileInput = (props) => {
    const {input, meta, child, takeFile, ...restProps} = props;
    return (<FormControls {...props}>
        <input type="file" onInput={(e) => takeFile(e.target)} {...input} {...restProps} />
    </FormControls>)
}

export const Select = (props) => {
    const {select, input, meta, child, ...restProps} = props;
    return (<FormControls {...props}>
        <select {...input}{...restProps} ></select>
    </FormControls>)
}