import DishData from "../../../dataModels/DishData";

export default interface IDishesActions{
    type: String,
    payload: {
        dishList ?: Array<DishData>,
        filters ?: Array<String>
    }
}
