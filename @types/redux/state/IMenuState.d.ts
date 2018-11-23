import DishData from "../../../dataModels/dishData";

export interface IMenuState {
    isLoaded: boolean,
    dishList: Array<DishData>
}