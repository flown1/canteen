import DishData from "../../dataModels/DishData";
import {ACTIONS} from "../constants/Actions";
import {ICartActionAddToCart, ICartActionDeleteOrder, ICartActionEmpty} from "../../@types/redux/actions/ICartActions";

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

export function emptyCart(): ICartActionEmpty {
    return {
        type: ACTIONS.CART.EMPTY,
        payload: {}
    }
}