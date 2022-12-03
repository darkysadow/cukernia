import { applyMiddleware } from "redux";
import { combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth-reducer";
import { menuReducer } from "./menu-reducer";

let reducers = combineReducers({
    menu: menuReducer,
    auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;