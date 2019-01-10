import ISignInState from "../../redux/state/ISignedInState";
import IReactNavigateProps from "../../@react-navigation/IReactNavigateProps";

export interface IAccountScreenProps {
    signIn: ISignInState
    navigation: IReactNavigateProps
    onLogout: () => void

}