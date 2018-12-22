import DishData from "../../../../../dataModels/DishData";

export interface IDishProps {
    dish: DishData,
    editableMode: boolean,

    addToCart: (dish: DishData) => void
}