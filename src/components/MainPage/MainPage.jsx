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
import { redirect, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLocation, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";


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
                <SwiperSlide><img src="https://scontent.fiev7-3.fna.fbcdn.net/v/t39.30808-6/311594566_773009547220295_868134658385156428_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=p-KkyjTwtUIAX_IrUgw&_nc_ht=scontent.fiev7-3.fna&oh=00_AfD4R7jgraiSkzgSUeds_dc1sYaSdK6ESRTpS1at8t8oAA&oe=63ED2567" height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://scontent.fiev7-4.fna.fbcdn.net/v/t39.30808-6/306325471_742938053560778_4617483110567365969_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=P0SYP7Zj6BwAX9QMHda&_nc_ht=scontent.fiev7-4.fna&oh=00_AfC-UjPTyuPPIcHv5Pua4-YvuAn_DLROPmwFch7UrBKSjQ&oe=63ECE849" height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://scontent.fiev7-4.fna.fbcdn.net/v/t39.30808-6/299345782_584431546608409_1187004183726658249_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a26aad&_nc_ohc=clv-cjYQggAAX8q9Fat&tn=pS9ME2Av9W1LQRRU&_nc_ht=scontent.fiev7-4.fna&oh=00_AfCK1D7-aWFwSGP5UDTsOH1sqL9I-RtxzKbpeVD_aWKOlg&oe=63ED9600" height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://scontent.fiev7-3.fna.fbcdn.net/v/t39.30808-6/289472693_550024163382481_4541371884603523865_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a26aad&_nc_ohc=nk_0U8N2QNIAX9rhIHN&_nc_ht=scontent.fiev7-3.fna&oh=00_AfBELZp88msWgSy_roHrFuXeQgYgj376e2sny4kxOQ00-g&oe=63EC0D8F" height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://scontent.fiev7-4.fna.fbcdn.net/v/t39.30808-6/247621385_397744535277112_2097217819864239853_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a26aad&_nc_ohc=pIiHzE_Emi8AX-jKGJ1&_nc_ht=scontent.fiev7-4.fna&oh=00_AfCDAREY2WONPOatFMRgXW6fhZREe92bb5kWy1YhDoCMrg&oe=63EC6023" height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://scontent.fiev7-3.fna.fbcdn.net/v/t39.30808-6/243094495_391138855937680_6124165743210427899_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a26aad&_nc_ohc=m_VmQ_KBx-AAX9TSYIv&_nc_ht=scontent.fiev7-3.fna&oh=00_AfDW2CkFBGzO3nehlGG6uEjLFyroP2cJ84f9B7h71XdSiA&oe=63ECBF48" height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://scontent.fiev7-4.fna.fbcdn.net/v/t39.30808-6/306325471_742938053560778_4617483110567365969_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=P0SYP7Zj6BwAX9QMHda&_nc_ht=scontent.fiev7-4.fna&oh=00_AfCBuxwu89bQj7xXDGYqfMsqZeRb_XRIKgSDfB_c5pWirA&oe=63EAEE09" height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://scontent.fiev7-4.fna.fbcdn.net/v/t39.30808-6/305804270_741750627012854_1252444458412339549_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=YBufVucMXZ8AX-t5u7q&_nc_ht=scontent.fiev7-4.fna&oh=00_AfC6sTajZ8ibT9G1xijtIx58iFeSQlXlfuzBEggt0CXymQ&oe=63EAC9AD" height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://scontent.fiev7-4.fna.fbcdn.net/v/t39.30808-6/301147855_590909562627274_8534414343246353148_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a26aad&_nc_ohc=jluBrZbB5JYAX-3Yk-P&_nc_ht=scontent.fiev7-4.fna&oh=00_AfAkQIU2TlZy6aNU9mdzcQSp0ChLRAxjyChelUP7GxI6xg&oe=63EAFA1D" height='200px' width='100%' style={{ objectFit: 'cover' }} alt="" /></SwiperSlide>
            </Swiper>
            <div className={`${s.sliderBlockMenu} ${'container'}`}>
                <h3>наше меню</h3>
                <div className={s.menuImageBlock}>
                    <img src="https://scontent.fiev7-4.fna.fbcdn.net/v/t39.30808-6/241631261_370244661360433_1932873507780080631_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a26aad&_nc_ohc=PevAd-aO_vUAX8kXVqt&_nc_ht=scontent.fiev7-4.fna&oh=00_AfBHiQ1uJYvtHvdeb0dsKMkpQFeo0K2FIVKfwYMU8gE96w&oe=63ED9022" alt="menu" />
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

