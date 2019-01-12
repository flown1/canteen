import DishData from "../../dataModels/DishData";
import {ACTIONS} from "../constants/Actions";
import {ICartActionAddToCart, ICartActionDeleteOrder, ICartActionEmpty} from "../../@types/redux/actions/ICartActions";
import OrderDataItem from "../../dataModels/OrderDataItem";

export function addDishToCart(dish: DishData) : ICartActionAddToCart {
    return {
        type: ACTIONS.CART.ADD_DISH,
        payload: {
            dish: dish
        }
    }
}

export function deleteOrderFromCart(orderDataItem: OrderDataItem): ICartActionDeleteOrder {
    return {
        type: ACTIONS.CART.DELETE_ORDER,
        payload: {
            orderDataItem: orderDataItem
        }
    }

}

export function emptyCart(): ICartActionEmpty {
    return {
        type: ACTIONS.CART.EMPTY,
        payload: {}
    }
}