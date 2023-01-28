import React from "react";
import s from './PagePreloader.module.css';
import Preloader from "./Preloader";

const PagePreloader = (props) => {
    return (
        <div className={s.wrapper}>
            <Preloader />
        </div>
    )
}

export default PagePreloader;