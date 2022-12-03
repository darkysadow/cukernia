import React from "react";
import { connect } from "react-redux";
import s from './MenuPage.module.css';
import {getMenu} from './../../redux/menu-reducer';

/*const MenuPage = (props) => {
    return(
        <div className={`${s.menuPage} ${'container'}`}>
            <div className={s.menuCategories}></div>
            <div className={s.menuContainer}>

            </div>
        </div>
    )
}*/

class MenuPage extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div className={`${s.menuPage} ${'container'}`}>
                <div className={s.menuCategories}></div>
                <div className={s.menuContainer}>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu.menu
    }
}

export default connect(mapStateToProps, {getMenu})(MenuPage);