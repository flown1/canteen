import User from "../../../dataModels/user";

export default interface ISignInState {
    isSignedIn: boolean,
    user: User
}
