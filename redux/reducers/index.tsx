import {combineReducers} from "redux";
import signIn from './signInReducer'
import menu from "./menuReducer";
import cart from "./cartReducer";

export default combineReducers({
    signIn,
    menu,
    cart
});