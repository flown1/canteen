import {ICartState} from "../../@types/redux/state/ICartData";
import {ACTIONS} from "../constants/Actions";
import OrderDataItem from "../../dataModels/OrderDataItem";
import DishData from "../../dataModels/DishData";

const initialState : ICartState= {
    items: new Array<OrderDataItem>(),
    total: 0.00
};
const addDishToCart = (items, dish: DishData): ICartState => {
    const orderAlreadyExists = items.find((o: OrderDataItem) => {
        return o.dish.id === dish.id;
    });

    let newItems;
    let newOrder;

    if (orderAlreadyExists) {
        orderAlreadyExists.quantity += 1;
        newItems = items;
    } else {
        newOrder = new OrderDataItem(dish, 1);

        items.push(newOrder);
        newItems = items;
    }

    return newItems;
};

export default function cart(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.CART.ADD_DISH: {
            const newItems = addDishToCart(state.items, action.payload.dish);
            const cost = action.payload.dish.price;
            const newTotal = state.total + cost;

            return {
                ...state,
                items: newItems,
                total: newTotal
            };
        }
        case ACTIONS.CART.DELETE_ORDER: {
            const orderToDelete = action.payload.orderDataItem;
            const cost = action.payload.orderDataItem.total;
            const newTotal = state.total - cost;

            return {
                ...state,
                items: state.items.filter((o: OrderDataItem) => o !== orderToDelete),
                total: newTotal
            };
        }
        case ACTIONS.CART.EMPTY:
            return {
                ...state,
                items: []
            };
        default:
            return state
    }
};