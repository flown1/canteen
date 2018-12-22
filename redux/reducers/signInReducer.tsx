import SignInResults from "../constants/SignInResults";
import ISignInState from "../../@types/redux/state/ISignedInState";
import {ISignInAction} from "../../@types/redux/actions/ISignInActions";
import UserData from "../../dataModels/UserData";

const initialState : ISignInState= {
    isSignedIn: false,
    user: new UserData("---","---","---","---", "---")
};

export default function signIn(state = initialState, action: ISignInAction) :ISignInState {
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