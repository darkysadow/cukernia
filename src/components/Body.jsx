import React from "react";
import s from './Body.module.css'
import coffee from './../img/coffee.jpg';
import lunch from './../img/lunch.jpg';
import bakery from './../img/bakery.jpg';
import cake from './../img/cake.png';
import food from './../img/food.png';
//const imgLink = 'https://scontent.fiev22-2.fna.fbcdn.net/v/t39.30808-6/299279495_2167763320052670_6033386753165407245_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=k5mIxSO6o1cAX-bzBbG&_nc_ht=scontent.fiev22-2.fna&oh=00_AfA32y7qJXWTL0A_GMncV5p805EfpS-c4IK1rMFXGjzK1A&oe=638BF331';
const Body = (props) => {
    return (<div className={s.main}>
        {/*<div className={s.photoBlock}>
            <div className={s.gradientBlock}>
                <div className="container">
                    <div className={s.textContainer}>
                        <div className={s.textHeader}>
                            Lorem ipsum dolor sit amet consectetur
                        </div>
                        <div className={s.textMain}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dicta cum earum facilis sunt cumque in odit optio a impedit. Tenetur dolorem, commodi fuga nisi quisquam molestias quas
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.image}>
                <img src={imgLink} alt="" />
            </div>
        </div>*/}

        <div className={`${s.helloBlock} ${'container'}`}>
            <div className={s.helloTextBlock}>
                <div className={s.textContainer}>
                    <div className={s.textHeader}>
                    Ми не готуємо, ми створюємо ваші емоції !
                    </div>
                    <div className={s.textMain}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dicta cum earum facilis sunt cumque in odit optio a impedit. Tenetur dolorem, commodi fuga nisi quisquam molestias quas
                    </div>
                    <div className={s.textButtons}>
                        <div className={s.buttonMenu}>
                            <button>Наше меню</button>
                        </div>
                        <div className={s.buttonAbout}>
                            <button>Про нас</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.helloImageBlock}>
                <div className={s.helloImage}>
                    <img src={coffee} alt="" className={s.coffee}/>
                    <img src={lunch} alt="" className={s.lunch}/>
                    <img src={bakery} alt="" className={s.bakery}/>
                    <div className={s.circle1}></div>
                    <div className={s.circle2}></div>
                    <div className={s.circle3}></div>
                    <div className={s.circle4}></div>
                    <div className={s.circle5}></div>
                    <img src={cake} alt="" className={s.cake}/>
                    <img src={food} alt="" className={s.food}/>
                </div>
            </div>
        </div>
        Body</div>)
}

export default Body;