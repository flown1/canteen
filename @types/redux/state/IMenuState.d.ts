import DishData from "../../../dataModels/DishData";

export interface IMenuState {
    isLoaded: boolean,
    dishListShow: Array<DishData>
}