import GoogleAuthUser from "../../dataModels/GoogleAuthUser";
import SignInResults from "../constants/SignInResults";
import {ISignInAction} from "../../@types/redux/actions/ISignInActions";


export default function signInSuccesful(user: GoogleAuthUser) : ISignInAction {
  return {
      type: SignInResults.SUCCESS,
      payload: {
          isSignedIn: true,
          user: user
      }
  }
};