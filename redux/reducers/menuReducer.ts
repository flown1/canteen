import DishData from "../../dataModels/DishData";
import { ACTIONS } from "../constants/Actions";
import { IMenuReducerActions } from "../../@types/redux/actions/IMenuReducerActions";

const initialState = {
    isLoaded: false,
    dishList: new Array<DishData>(),
    dishListShow: new Array<DishData>(),
    filters: new Array<String>()
};

export default function menu(state = initialState, action: IMenuReducerActions) {
    switch (action.type) {

        case ACTIONS.DISHES.RETRIEVED: {
            return {
                dishList: action.payload.dishList,
                dishListShow: action.payload.dishList,
                isLoaded: true,
                filters: state.filters
            };
        }
        case ACTIONS.DISHES.UPDATE: {
            const dishToUpdate = action.payload.dish;
            let newDishList = [];

            state.dishList.map((dish: DishData) => {

                if (dish.namePL === dishToUpdate.namePL) {
                    newDishList.push(dishToUpdate);
                } else {
                    newDishList.push(dish);
                }
            });

            let newDishListShow = [];

            state.dishListShow.map((dish: DishData) => {

                if (dish.namePL === dishToUpdate.namePL) {
                    newDishListShow.push(dishToUpdate);
                } else {
                    newDishListShow.push(dish);
                }
            });

            return {
                dishList: newDishList,
                dishListShow: newDishListShow,
                isLoaded: true,
                filters: state.filters
            }
        }
        case ACTIONS.FILTER.ADD: {
            let dishListShow = [];
            state.dishList.map((dish: DishData) => {

                const filters = state.filters.concat(action.payload.filter);
                filters.map((filter) => {
                    if (dish.tags) {
                        if (dish.tags.indexOf(filter) >= 0) {
                            dishListShow.push(dish)
                        }
                    } else {
                        return null;
                    }
                });
            });

            return {
                filters: state.filters.concat(action.payload.filter),
                isLoaded: state.isLoaded,
                dishList: state.dishList,
                dishListShow: dishListShow
            };
        }
        case ACTIONS.FILTER.DELETE: {
            let newFilters;
            let dishListShow = [];

            if (state.filters.length === 1) {
                newFilters = [];
                dishListShow = state.dishList;
            } else {
                newFilters = [state.filters.filter((e) => {
                    return e !== action.payload.filter;
                })];

                state.dishList.map((dish: DishData) => {
                    const filters = state.filters.concat(action.payload.filter);
                    filters.map((filter) => {
                        if (dish.tags) {
                            if (dish.tags.indexOf(filter) > 0) {
                                dishListShow.push(dish)
                            }
                        } else {
                            return null;
                        }
                    });
                });
            }

            return {
                filters: newFilters,
                isLoaded: state.isLoaded,
                dishList: state.dishList,
                dishListShow: dishListShow
            };
        }
        default:
            return state
    }
};