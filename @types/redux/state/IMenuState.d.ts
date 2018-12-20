import DishData from "../../../dataModels/dishData";

export interface IMenuState {
    isLoaded: boolean,
    dishListShow: Array<DishData>
}