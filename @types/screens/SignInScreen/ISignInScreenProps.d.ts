import IReactNavigateProps from "../../@react-navigation/IReactNavigateProps";
import UserData from "../../../dataModels/UserData";

export default interface ISignInScreenProps {
    navigation: IReactNavigateProps,
    onSuccessfulSignIn: (user: UserData) => {}
}