import User from "../../../dataModels/user";
import IReactNavigateProps from "../../@react-navigation/IReactNavigateProps";

export default interface ISignInScreenProps {
    navigation: IReactNavigateProps,
    onSuccessfulSignIn: (user: User) => {}
}