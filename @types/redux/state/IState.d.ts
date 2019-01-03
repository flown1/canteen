import {IMenuState} from "./IMenuState";
import {ICartState} from "./ICartData";
import ISignInState from "./ISignedInState";


interface IState {
    signIn: ISignInState,
    menu: IMenuState,
    cart: ICartState
}