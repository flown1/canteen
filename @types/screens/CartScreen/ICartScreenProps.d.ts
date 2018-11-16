import {ICartState} from "../../redux/state/ICartData";
import IReactNavigateProps from "../../@react-navigation/IReactNavigateProps";

interface ICartScreenProps {
    cart: ICartState,
    onDelete: (string) => void,
    navigation: IReactNavigateProps
}