import GoogleAuthUser from "../../dataModels/GoogleAuthUser";
import SignInResults from "../constants/SignInResults";
import ISignInState from "../../@types/redux/state/ISignedInState";
import {ISignInAction} from "../../@types/redux/actions/ISignInActions";

const initialState : ISignInState= {
    isSignedIn: false,
    user: new GoogleAuthUser("---","---","---","---","---")
};

export default function signIn(state = initialState, action: ISignInAction) {
    switch (action.type) {
        case SignInResults.SUCCESS:
            return  {
                isSignedIn: true,
                user: action.payload.user
            };
        default:
            return state
    }
};