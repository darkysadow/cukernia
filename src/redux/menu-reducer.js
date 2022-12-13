import { menuAPI } from "../api/api";
import { getCategories } from "../utilites/firebase/firestore";

const SET_MENU = 'SET_MENU';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_CATEGORIES = 'SET_CATEGORIES';

let initialState = {
    isFetching: false,
    menu: {
        appetizers: [
            //Закуски
        ],
        meatFish: [],
        tistechka: [],
        breakfast: [],
        salads: [],
        backery: [
            //Випічка
        ],
        strudli: [],
        firstCourse: [
            //Перші страви
        ],
        pancakes: [],
        garnish: [
            //Гарніри
        ],
        pasta: [],
        cakes: [],
        coldDrinks: [],
        lemonades: [],
        hotDrinks: []
    },
    categories: []
}

export let menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MENU:
            return console.log(action.menu);
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case SET_CATEGORIES:
            return {
                ...state, categories: action.categories
            }
        default:
            return state;
    }
}

const toggleFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
const setMenu = (menu) => ({type: SET_MENU, menu});
const setCategories = (categories) => ({type: SET_CATEGORIES, categories})

export const getMenu = (category) => (dispatch) => {
    dispatch(toggleFetching(true));
    menuAPI.getMenu(category).then(data => {
        dispatch(toggleFetching(false));
        dispatch(setMenu(data.data.items));
    })
}

export const getMenuCategories = () => (dispatch) => {
    getCategories().then(data => {
        console.log(data);
        dispatch(setCategories(data))
    })
}

/*export const getUsers = (pageNumber) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(pageNumber).then(data => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.data.items));
        dispatch(totalUsers(data.data.totalCount));
    })
}*/