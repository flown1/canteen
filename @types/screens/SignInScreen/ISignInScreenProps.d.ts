import IReactNavigateProps from "../../@types/@react-navigation/IReactNavigateProps";
import User from "../../../dataModels/user";

export default interface ISignInScreenProps {
    navigation: IReactNavigateProps,
    onSuccessfulSignIn: (user: User) => {}
}