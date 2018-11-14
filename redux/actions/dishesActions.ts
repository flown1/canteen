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