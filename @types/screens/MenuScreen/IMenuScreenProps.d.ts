import IReactNavigateProps from "../../@types/@react-navigation/IReactNavigateProps";
import UserData from "../../../dataModels/UserData";

export default interface IMenuScreenProps {
    navigation : IReactNavigateProps
    user: UserData

    onDishesReceived: (Object) => void
}