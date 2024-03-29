import React from "react";
import s from './MainPage.module.css';
import coffee from './../../img/coffee.jpg';
import lunch from './../../img/lunch.jpg';
import bakery from './../../img/bakery.jpg';
import cake from './../../img/cake.png';
import food from './../../img/food.png';
import phone from './../../img/phone.png';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import SwiperCore, { A11y, EffectCoverflow, Navigation, Pagination, Scrollbar } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import s1 from './../../img/s1.jpg';
import s2 from './../../img/s2.jpg';
import s3 from './../../img/s3.jpg';
import s4 from './../../img/s4.jpg';
import s5 from './../../img/s5.jpg';
import menuImage from './../../img/m.jpg';
import { redirect, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLocation, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL } from "../../utilites/firebase/storage";


SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const MainPage = (props) => {
    const navigate = useNavigate();
    return (<><div className={`${s.helloBlock} ${'container'}`}>
        <div className={s.helloTextBlock}>
            <div className={s.textBlockTitle}>
                Традиції та досвід поколінь <br />втілені у солодощах.
            </div>
            <div className={s.textBlockSubtitle}>
                Аби досягнути досконалості, потрібен час та зосередженість на деталях. Наші солодощі – це правдиві львівські традиції, праця і досвід кількох поколінь, тисячі спроб, осяянь, ретельний добір смаків, відтінків, ароматів, відчуттів та лише якісні продукти!
            </div>
        </div>
        <div className={s.helloImageBlock}>
            <div className={s.helloImage}>
                <img src={coffee} alt="" className={s.coffee} />
                <img src={lunch} alt="" className={s.lunch} />
                <img src={bakery} alt="" className={s.bakery} />
                <div className={s.circle1}></div>
                <div className={s.circle2}></div>
                <div className={s.circle3}></div>
                <div className={s.circle4}></div>
                <div className={s.circle5}></div>
                <img src={cake} alt="" className={s.cake} />
                <img src={food} alt="" className={s.food} />
            </div>
        </div>
    </div>
        <div className={s.sliderBlock}>
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                navigation
                loopedSlides={2}
                effect='coverflow'
                centeredSlides
                coverflowEffect={{ rotate: 20, stretch: 0, depth: 200, modifier: 1, slideShadows: true }}
                pagination={{ clickable: true }}
            >
                <SwiperSlide><img src={s1} alt="" height='200px' width='100%' style={{ objectFit: 'cover' }} /></SwiperSlide>
                <SwiperSlide><img src={s2} height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src={s3} height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src={s4} height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src={s5} height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>            </Swiper>
            <div className={`${s.sliderBlockMenu} ${'container'}`}>
                <h3>наше меню</h3>
                <div className={s.menuImageBlock}>
                    <img src={menuImage} alt="menu" />
                </div>
                <button onClick={() => navigate('/menu')}>переглянути меню</button>
            </div>
        </div>
        <div className={`${s.contactsBlock} ${'container'}`}>
            <div className={s.contactsTextBlock}>
                <h3>Контакти</h3>
                <p><span className={s.location}><FontAwesomeIcon icon={faLocationDot} color='#611518' /></span>м.Вінниця, вул. Грушевського, 28</p>
                <p><span className={s.tel1}><FontAwesomeIcon icon={faPhone} color='#611518' /></span><a href="tel:+380432508251">+38 (0432) 50-82-51</a></p>
                <p><span className={s.tel2}><FontAwesomeIcon icon={faPhone} color='#611518' /></span><a href="tel:+380979541041">+38 (097) 954-10-41</a></p>
                <div className={s.socialRow}>
                    <a href="https://www.instagram.com/cukernya_vinnitsa/" target='_blank'><button><FontAwesomeIcon icon={faInstagram} size="3x" color='#611518' /></button></a>
                    <a href="https://www.facebook.com/cukernya.vin?locale=uk_UA" target='_blank'><button><FontAwesomeIcon icon={faFacebook} size="3x" color='#611518' /></button></a>
                </div>
                <div className={s.schedule}>
                    <h4>Графік роботи:</h4>
                    <p>Щодня: 10:00 - 22:00</p>
                    <p>Комплексні обіди 12:00 - 15:00 (будні)</p>
                </div>
            </div>
            <div className={s.contactsImageBlock}>
                <img src="https://scontent.fiev7-4.fna.fbcdn.net/v/t39.30808-6/306325471_742938053560778_4617483110567365969_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=P0SYP7Zj6BwAX9QMHda&_nc_ht=scontent.fiev7-4.fna&oh=00_AfC-UjPTyuPPIcHv5Pua4-YvuAn_DLROPmwFch7UrBKSjQ&oe=63ECE849" alt="" />
            </div>
        </div>
        <div className={`${s.deliveryBlock} ${s.sliderBlock}`}>
            <div className={`${s.deliveryContainer} ${'container'}`}>
                <h3>Ви можете замовити доставку від нас</h3>
                <div className={s.deliveryItems}>
                    <a href="tel:+380979541041" className={`${s.deliveryVariant}`}>
                        <h4>За телефоном</h4>
                        <img src={phone} alt="" className={s.phoneImage} />
                    </a>
                    <a href="https://misteram.com.ua/vinnytsia/tsukernia" target={"_blank"} className={`${s.deliveryVariant} ${s.misteram}`}>
                        <h4>У сервісі Mister.Am</h4>
                        <img src="https://assets.dots.live/misteram-public/834430e59254a7905c6e510a1a87ced0.png" alt="" />
                    </a>
                </div>
            </div>
        </div>
        <div className={`${s.footer} ${"container"}`}>
            <p>Copyright. All rights reserved. 2023</p>
        </div>

    </>);
}

export default MainPage;

