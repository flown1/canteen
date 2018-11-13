import DishData from "../../dataModels/dishData";
import IDishesActions from "../../@types/redux/actions/IDishesActions";
import {ACTIONS} from "../constants/Actions";

const initialState = {
    dishList: new Array<DishData>()
};

export default function menu(state = initialState, action: IDishesActions) {
    switch (action.type) {
        case ACTIONS.DISHES.RETRIEVED:
            console.log("menu triggered with", action.payload.dishList);
            return  {
                dishList: action.payload.dishList
            };
        default:
            return state
    }
};