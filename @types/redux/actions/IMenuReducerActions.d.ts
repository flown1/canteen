import DishData from "../../../dataModels/DishData";


interface IMenuReducerActions {
    type: String,
    payload: {
        filter ?: String,
        dishList ?: Array<DishData>
    }
}