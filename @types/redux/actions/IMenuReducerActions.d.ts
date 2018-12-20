import DishData from "../../../dataModels/dishData";


interface IMenuReducerActions {
    type: String,
    payload: {
        filter ?: String,
        dishList ?: Array<DishData>
    }
}