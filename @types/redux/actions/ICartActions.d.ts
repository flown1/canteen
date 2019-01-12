import DishData from "../../../dataModels/DishData";
import OrderDataItem from "../../../dataModels/OrderDataItem";

interface ICartActionAddToCart {
    type: String,
    payload: {
        dish: DishData
    }
}

interface ICartActionDeleteOrder {
    type: String,
    payload: {
        orderDataItem: OrderDataItem
    }
}

interface ICartActionEmpty {
    type: String
    payload: {}
}