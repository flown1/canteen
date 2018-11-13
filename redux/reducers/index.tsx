import {combineReducers} from "redux";
import signIn from './signInReducer'
import menu from "./menuReducer";

export default combineReducers({
    signIn,
    menu
});