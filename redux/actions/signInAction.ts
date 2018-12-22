import SignInResults from "../constants/SignInResults";
import {ISignInAction} from "../../@types/redux/actions/ISignInActions";
import UserData from "../../dataModels/UserData";


export default function signInSuccesful(user: UserData) : ISignInAction {
  return {
      type: SignInResults.SUCCESS,
      payload: {
          isSignedIn: true,
          user: user
      }
  }
};