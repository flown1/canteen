import DishData from "../../../../../dataModels/dishData";

export interface IDishProps {
    dish: DishData,

    addToCart: (dish: DishData) => void
}