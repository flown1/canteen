import DishData from "../../../dataModels/dishData";

export interface ICartActionAddToCart {
    type: String,
    payload: {
        dish: DishData
    }
}

export interface ICartActionDeleteOrder {
    type: String,
    payload: {
        idToDelete: string
    }
}
