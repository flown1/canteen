import DishData from "../../dataModels/dishData";
import {ACTIONS} from "../constants/Actions";
import {ICartActionAddToCart, ICartActionDeleteOrder} from "../../@types/redux/actions/ICartActions";

export function addDishToCart(dish: DishData) : ICartActionAddToCart {
    return {
        type: ACTIONS.CART.ADD_DISH,
        payload: {
            dish: dish
        }
    }
}

export function deleteOrderFromCart(id: string): ICartActionDeleteOrder {
    return {
        type: ACTIONS.CART.DELETE_ORDER,
        payload: {
            idToDelete: id
        }
    }

}