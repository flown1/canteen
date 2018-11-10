import User from "../../dataModels/user";
import SIGN_IN_RESULT from "../reducers/signInReducer";

export default function signInSuccesful(user: User){
  return {
      type: SIGN_IN_RESULT.SUCCESS,
      payload: {
          signedIn: true,
          user: user
      }
  }
};