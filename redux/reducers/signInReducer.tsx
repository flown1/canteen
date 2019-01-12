import SignInResults from "../constants/SignInResults";
import ISignInState from "../../@types/redux/state/ISignedInState";
import {ISignInAction} from "../../@types/redux/actions/ISignInActions";
import UserData from "../../dataModels/UserData";
import SignOutResults from "../constants/SignOutResults";
import {ACTIONS} from "../constants/Actions";

const initialState : ISignInState= {
    isSignedIn: false,
    user: new UserData("---","---","---","---", "---")
};

export default function signIn(state = initialState, action) :ISignInState {
    switch (action.type) {
        case SignInResults.SUCCESS:
            return  {
                isSignedIn: true,
                user: action.payload.user
            };
        case SignOutResults.SUCCESS:
            const dummyUser = new UserData("---","---","---","---", "---");
            return {
                isSignedIn: false,
                user: dummyUser
            };
        case ACTIONS.TOKEN.UPDATE_EXPONENT_PUSH_TOKEN:

            break;
        default:
            return state
    }
};