import DishData from "../../../../../dataModels/DishData";
import IReactNavigateProps from "../../../../@react-navigation/IReactNavigateProps";

export interface IDishProps {
    dish: DishData,
    editableMode: boolean,

    navigation: IReactNavigateProps,
    addToCart: (dish: DishData) => void
}