import SignInResults from "../constants/SignInResults";
import {ISignInAction} from "../../@types/redux/actions/ISignInActions";
import UserData from "../../dataModels/UserData";
import SignOutResults from "../constants/SignOutResults";
import {ISignOutAction} from "../../@types/redux/actions/ISignOutActions";


export function signInSuccesful(user: UserData) : ISignInAction {
  return {
      type: SignInResults.SUCCESS,
      payload: {
          isSignedIn: true,
          user: user
      }
  }
};

export function signOut() : ISignOutAction {
    return {
        type: SignOutResults.SUCCESS,
        payload: {
            isSignedIn: false,
            user: null
        }
    }
};

