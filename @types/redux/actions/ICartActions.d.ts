import DishData from "../../../dataModels/DishData";

interface ICartActionAddToCart {
    type: String,
    payload: {
        dish: DishData
    }
}

interface ICartActionDeleteOrder {
    type: String,
    payload: {
        idToDelete: string
    }
}

interface ICartActionEmpty {
    type: String
    payload: {}
}