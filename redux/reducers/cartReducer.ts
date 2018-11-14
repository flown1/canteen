import {ICartState} from "../../@types/redux/state/ICartData";
import DishData from "../../dataModels/dishData";
import ICartAction from "../../@types/redux/actions/ICartAction";
import {ACTIONS} from "../constants/Actions";

const initialState : ICartState= {
    items: new Array<DishData>()
};

export default function cart(state = initialState, action: ICartAction) {
    console.log("state before adding new dish: ", state);
    switch (action.type) {
        case ACTIONS.CART.ADD_DISH:
            return  {
                ...state,
                items: [...state.items, action.payload.dish]
            };
        default:
            return state
    }
};