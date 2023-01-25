import React from "react";
import s from './PagePreloader.module.css';

const PagePreloader = (props) => {
    return (
        <div className={s.container}>
            <div className={s.plate}></div>
            <div className={s.cup}>
                <div className={s.top}>
                    <div className={s.vapour}>
                        <span style={{'--i': 1}}></span>
                        <span style={{'--i': 3}}></span>
                        <span style={{'--i':16}}></span>
                        <span style={{'--i':5}}></span>
                        <span style={{'--i':13}}></span>
                        <span style={{'--i':20}}></span>
                        <span style={{'--i':6}}></span>
                        <span style={{'--i':7}}></span>
                        <span style={{'--i':10}}></span>
                        <span style={{'--i':8}}></span>
                        <span style={{'--i':17}}></span>
                        <span style={{'--i':11}}></span>
                        <span style={{'--i':12}}></span>
                        <span style={{'--i':14}}></span>
                        <span style={{'--i':2}}></span>
                        <span style={{'--i':9}}></span>
                        <span style={{'--i':15}}></span>
                        <span style={{'--i':4}}></span>
                        <span style={{'--i':19}}></span>

                    </div>
                    <div className={s.circle}>
                        <div className={s.tea}>

                        </div>
                    </div>
                </div>
                <div className={s.handle}>

                </div>
            </div>
        </div>
    )
}

export default PagePreloader;