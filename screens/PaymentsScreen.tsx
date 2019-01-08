import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import BraintreeCheckoutView from "../components/Button/BraintreeCheckoutView";
import IReactNavigateProps from "../@types/@react-navigation/IReactNavigateProps";
import OrderCodeCircle from "../components/OrderCodeCircle/OrderCodeCircle";
import {NavigationActions, StackActions} from "react-navigation";
import OKButton from "../components/Button/OKButton";
import {emptyCart} from "../redux/actions/cartActions";
import CanteenApi from "../utils/CanteenApi";
import OrderDataItem from "../dataModels/OrderDataItem";
import {IState} from "../@types/redux/state/IState";
import {ICartState} from "../@types/redux/state/ICartData";

interface IPaymentsScreenProps {
    navigation: IReactNavigateProps,
    emptyCart: () => void
    cart: ICartState
}

interface IPaymentsScreenState {
    isPaymentComplete: boolean,
    orderCode: string
}

class PaymentsScreen extends React.Component<IPaymentsScreenProps, IPaymentsScreenState> {
    state = {
        isPaymentComplete: false,
        orderCode: "----"
    };

    render() {
        const toRender = this.state.isPaymentComplete?
            <View style={styles.container}>
                <Text style={styles.paymentStatusTitle}>Płatność zakończona!</Text>
                <View style={styles.bottomBox}>
                    <OrderCodeCircle code={this.state.orderCode}/>
                    <OKButton onPress={this._handleOnOKButtonPress}/>
                </View>
            </View>
            :
            <View style={styles.container}>
                <BraintreeCheckoutView onPaymentComplete={this._handleOnPaymentComplete}/>
            </View>;

        return (
            <>
                {toRender}
            </>
        );
    }

    private _handleOnPaymentComplete = (code: string): void => {
        this._setCode(code);
        this._showPaymentComplete();
        this._emptyCart();
    };

    private _showPaymentComplete = (): void => {
        this.setState({isPaymentComplete: true});
    };

    private _setCode = (code): void => {
        if(code) {
            this.setState({orderCode: code})
        }
    };

    private _handleOnOKButtonPress = (): void => {
        this._goBackToMenu();
    };

    private _goBackToMenu = (): void => {
        const _resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Menu'})
            ]
        });
        
        this.props.navigation.dispatch( _resetAction );
    };

    private _emptyCart = (): void => {
        this.props.emptyCart();
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        emptyCart: () => {dispatch(emptyCart())}
    }
};
const mapStateToProps = (state: IState) => {
    return {
        cart: state.cart
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    promptText: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular2,
        color: Colors.black,
        textAlign: 'center'
    },
    paymentStatusTitle: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular1,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 30
    },
    bottomBox: {
        justifyContent: 'center',
        marginLeft: 80
    }
});