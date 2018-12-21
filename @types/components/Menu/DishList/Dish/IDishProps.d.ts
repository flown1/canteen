import DishData from "../../../../../dataModels/DishData";

export interface IDishProps {
    dish: DishData,

    addToCart: (dish: DishData) => void
}