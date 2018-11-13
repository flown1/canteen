import {IMenuState} from "./IMenuState";
import {ICartState} from "./ICartData";
import ISignInState from "./ISignedInState";


export interface IState {
    signInState: ISignInState,
    menu: IMenuState,
    cart: ICartState
}