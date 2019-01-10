import SignInResults from "../../../redux/constants/SignInResults";
import ISignInState from "../state/ISignedInState";
import SignOutResults from "../../../redux/constants/SignOutResults";

export interface ISignOutAction {
    type: SignOutResults,
    payload: ISignInState
}
