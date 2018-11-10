import User from "../../dataModels/user";


interface ISignInState {
    isSignedIn : boolean,
    user: User | undefined
}

interface ISignInAction {
    type: String,
    payload: {
        signInSuccessful: boolean,
        user: User
    }
}

const initialState : ISignInState= {
    isSignedIn: false,
    user: undefined
};

export default function signIn(state = initialState, action: ISignInAction) {
    switch (action.type) {
        case "SIGNED_IN":
            return {
                ...state,
                isSignedIn: action.payload.signInSuccessful,
                user: action.payload.user
            };
        default:
            return state
    }
};