import User from "../../dataModels/user";
import SignInResults from "../constants/SignInResults";
import {ISignInAction} from "../../@types/redux/actions/ISignInActions";


export default function signInSuccesful(user: User) : ISignInAction {
  return {
      type: SignInResults.SUCCESS,
      payload: {
          isSignedIn: true,
          user: user
      }
  }
};