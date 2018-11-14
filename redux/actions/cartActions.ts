import DishData from "../../dataModels/dishData";
import {ACTIONS} from "../constants/Actions";
import ICartAction from "../../@types/redux/actions/ICartAction";

export function addDishToCart(dish: DishData) : ICartAction {
    return {
        type: ACTIONS.CART.ADD_DISH,
        payload: {
            dish: dish
        }
    }
}