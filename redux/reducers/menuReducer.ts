import DishData from "../../dataModels/dishData";
import IDishesActions from "../../@types/redux/actions/IDishesActions";
import {ACTIONS} from "../constants/Actions";

const initialState = {
    isLoaded: false,
    dishList: new Array<DishData>()
};

export default function menu(state = initialState, action: IDishesActions) {
    switch (action.type) {
        case ACTIONS.DISHES.RETRIEVED:
            return  {
                dishList: action.payload.dishList,
                isLoaded: true
            };
        default:
            return state
    }
};