import DishData from "../../../dataModels/dishData";

export default interface IDishesActions{
    type: String,
    payload: {
        dishList ?: Array<DishData>,
        filters ?: Array<String>
    }
}
