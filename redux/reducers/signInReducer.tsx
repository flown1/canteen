import User from "../../dataModels/user";
import SignInResults from "../constants/SignInResults";
import ISignInState from "../../@types/state/ISignedInState";
import {ISignInAction} from "../../@types/redux/actions/ISignInActions";

const initialState : ISignInState= {
    isSignedIn: false,
    user: new User("---","---","---","---","---")
};

export default function signIn(state = initialState, action: ISignInAction) {
    switch (action.type) {
        case SignInResults.SUCCESS:
            let newState = {
                isSignedIn: true,
                user: action.payload.user
            };

            return newState;
        default:
            return state
    }
};