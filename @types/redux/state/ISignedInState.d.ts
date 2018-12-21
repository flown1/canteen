import GoogleAuthUser from "../../../dataModels/GoogleAuthUser";

export default interface ISignInState {
    isSignedIn: boolean,
    user: GoogleAuthUser
}
