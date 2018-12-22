import {IMenuState} from "./IMenuState";
import {ICartState} from "./ICartData";
import ISignInState from "./ISignedInState";


export interface IState {
    signIn: ISignInState,
    menu: IMenuState,
    cart: ICartState
}