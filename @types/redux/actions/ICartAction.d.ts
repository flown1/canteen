import DishData from "../../../dataModels/dishData";

export default interface ICartAction {
    type: String,
    payload: {
        dish: DishData
    }
}

