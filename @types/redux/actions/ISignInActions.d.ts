import SignInResults from "../../../redux/constants/SignInResults";
import ISignInState from "../state/ISignedInState";

export interface ISignInAction {
    type: SignInResults,
    payload: ISignInState
}
