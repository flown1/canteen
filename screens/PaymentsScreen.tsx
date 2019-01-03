import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import BraintreeCheckoutButton from "../components/Button/BraintreeCheckoutButton";
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
        orderCode: "2138"
    };

    render() {
        const toRender = this.state.isPaymentComplete?
            <View style={styles.container}>
                <Text style={styles.paymentStatusTitle}>Płatność zakończona!</Text>
                <OrderCodeCircle code={this.state.orderCode}/>
                <OKButton onPress={this._handleOnOKButtonPress}/>
            </View>
            :
            <View style={styles.container}>
                <Text style={styles.promptText}>Wybierz metode platnosci:</Text>
                <BraintreeCheckoutButton onPaymentComplete={this._handleOnPaymentComplete}/>
            </View>;

        return (
            <>
                {toRender}
            </>
        );
    }

    private _handleOnPaymentComplete = () => {
        console.log("click");
        // const dishesOrdered = this.props.cart.items;
        // const order = new OrderDataItem(dishesOrdered, this.state.orderCode, false);
        //
        // CanteenApi.postOrder(order, (res) => {
        //     console.log("postOrder RESPONSE: ", res);
        //     if (res.status === "SUCCESS") {
        //
        //     }
        // });
        this._showPaymentComplete();
        this._emptyCart();
    };

    private _showPaymentComplete = () => {
        this.setState({isPaymentComplete: true});
    };

    private _handleOnOKButtonPress = () => {
        this._goBackToMenu();
    };

    private _goBackToMenu = () => {
        const _resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Menu'})
            ]
        });

        this.props.navigation.dispatch( _resetAction );
    };

    private _emptyCart = () => {
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
        justifyContent: 'center',
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
    }
});