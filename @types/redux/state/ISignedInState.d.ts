import UserData from "../../../dataModels/UserData";

export default interface ISignInState {
    isSignedIn: boolean,
    user: UserData
}
