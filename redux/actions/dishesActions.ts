import DishData from "../../dataModels/dishData";
import {ACTIONS} from "../constants/Actions";

interface IDishesRetrieved {
    type: string,
    payload: {
        dishList: Array<DishData>
    }
}

export function dishesRetrieved(dishList: Array<DishData>): IDishesRetrieved{
    return {
        type: ACTIONS.DISHES.RETRIEVED,
        payload: {
            dishList: dishList
        }
    }
}

interface IDishAddToCart {
    type: string,
    payload: {
        dish: DishData
    }
}

export function dishAddToCart(dish: DishData): IDishAddToCart {
    return {
        type: ACTIONS.DISHES.ADD_TO_CART,
        payload: {
            dish: dish
        }
    }
}