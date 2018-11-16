import {ICartState} from "../../@types/redux/state/ICartData";
import {ICartActionAddToCart} from "../../@types/redux/actions/ICartActions";
import {ACTIONS} from "../constants/Actions";
import OrderData from "../../dataModels/OrderData";
import DishData from "../../dataModels/dishData";

const initialState : ICartState= {
    items: new Array<OrderData>()
};
const addDishToCart = (items, dish: DishData): ICartState => {
    const orderAlreadyExists = items.find((o: OrderData) => {
        return o.dish.id === dish.id;
    });

    let newItems;
    let newOrder;

    if (orderAlreadyExists) {
        orderAlreadyExists.quantity += 1;
        newItems = items;
    } else {
        newOrder = new OrderData(dish, 1);

        items.push(newOrder);
        newItems = items;
    }

    return newItems;
};

export default function cart(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.CART.ADD_DISH:

            const newItems = addDishToCart(state.items, action.payload.dish);
            return  {
                ...state,
                items: newItems
            };
        case ACTIONS.CART.DELETE_ORDER:
            const idToDelete = action.payload.idToDelete;
            return {
                ...state,
                items: state.items.filter( (o: OrderData) => o.dish.id !== idToDelete)
            };
        default:
            return state
    }
};