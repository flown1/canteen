import DishData from "../../dataModels/dishData";
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
        case ACTIONS.FILTER.ADD: {
            let dishListShow = [];
            state.dishList.map((dish: DishData) => {

                const filters = state.filters.concat(action.payload.filter);
                filters.map((filter) => {
                    if (dish.tags) {
                        console.log("Dish ", dish.namePL, " has tags ", dish.tags, " checking for filter ", filter);
                        if (dish.tags.indexOf(filter) >= 0) {
                            dishListShow.push(dish)
                        } else {
                            console.log("was NOT added to dishListShow")
                        }
                    } else {
                        return null;
                    }
                });
            });

            console.log("Filters: ", state.filters.concat(action.payload.filter));
            console.log("DISHES THAT MADE THROUGH FILTERS: ", dishListShow);

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

            console.log("Filters: ", newFilters);
            console.log("DISHES THAT MADE THROUGH FILTERS: ", dishListShow);

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