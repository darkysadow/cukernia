import React from "react";
import s from './PagePreloader.module.css';

const Preloader = (props) => {
    const { size, ...restProps } = props
    const preloaderSize = !size ? 10 : size;
    return (
        <div className={s.container} style={{'--preloader-size': preloaderSize}}>
            <div className={s.plate} style={{'--preloader-size': preloaderSize}}></div>
            <div className={s.cup} style={{'--preloader-size': preloaderSize}}>
                <div className={s.top} style={{'--preloader-size': preloaderSize}}>
                    <div className={s.vapour} style={{'--preloader-size': preloaderSize}}>
                        <span style={{ '--i': 1 }}></span>
                        <span style={{ '--i': 3 }}></span>
                        <span style={{ '--i': 16 }}></span>
                        <span style={{ '--i': 5 }}></span>
                        <span style={{ '--i': 13 }}></span>
                        <span style={{ '--i': 20 }}></span>
                        <span style={{ '--i': 6 }}></span>
                        <span style={{ '--i': 7 }}></span>
                        <span style={{ '--i': 10 }}></span>
                        <span style={{ '--i': 8 }}></span>
                        <span style={{ '--i': 17 }}></span>
                        <span style={{ '--i': 11 }}></span>
                        <span style={{ '--i': 12 }}></span>
                        <span style={{ '--i': 14 }}></span>
                    </div>
                    <div className={s.circle} style={{'--preloader-size': preloaderSize}}>
                        <div className={s.tea} style={{'--preloader-size': preloaderSize}}>

                        </div>
                    </div>
                </div>
                <div className={s.handle} style={{'--preloader-size': preloaderSize}}>

                </div>
            </div>
        </div>
    )
}

export default Preloader;