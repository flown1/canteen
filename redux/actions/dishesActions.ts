import DishData from "../../dataModels/DishData";
import {ACTIONS} from "../constants/Actions";

interface IDishesRetrieved {
    type: string,
    payload: {
        dishList: Array<DishData>
    }
}

export function dishesRetrieved(dishList: Array<DishData>): IDishesRetrieved {
    return {
        type: ACTIONS.DISHES.RETRIEVED,
        payload: {
            dishList: dishList
        }
    }
}

interface IDishUpdate {
}

export function dishUpdate(dish: DishData): IDishUpdate {
    return {
        type: ACTIONS.DISHES.UPDATE,
        payload: {
            dish: dish
        }
    }
}

interface IAddFilter {
    type: string,
    payload: {
        filter: String
    }
}

export function addFilter(filter: String): IAddFilter {
    return {
        type: ACTIONS.FILTER.ADD,
        payload: {
            filter: filter
        }
    }
}

interface IDeleteFilter {
    type: string,
    payload: {
        filter: String
    }
}

export function deleteFilter(filter: String): IDeleteFilter {
    return {
        type: ACTIONS.FILTER.DELETE,
        payload: {
            filter: filter
        }
    }
}

interface IDishesUpdated {
    type: string,
    payload: {
        dishList: Array<DishData>
    }
}

export function dishesUpdated(dishList: Array<DishData>): IDishesUpdated {
    return {
        type: ACTIONS.DISHES.UPDATE,
        payload: {
            dishList: dishList
        }
    }
}

interface IDishDelete {
    type: string,
    payload: {
        dish: DishData
    }
}

export function dishDelete(dish: DishData): IDishDelete {
    return {
        type: ACTIONS.DISHES.DELETE,
        payload: {
            dish: dish
        }
    }
}
