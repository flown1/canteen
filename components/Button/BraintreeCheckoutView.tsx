import React from 'react';
import {StyleSheet, WebView,} from 'react-native';
import {Linking} from "expo";
import {CANTEEN_API_CONSTANTS} from "../../constants/CanteenApi";
import {Config} from "../../config/Config";
import {connect} from 'react-redux';
import CanteenApi from "../../utils/CanteenApi";
import OrderData from "../../dataModels/OrderData";
import {IState} from "../../@types/redux/state/IState";
import {ORDER_STATUS} from "../../constants/OrderStatus";
import UserData from "../../dataModels/UserData";
import {ICartState} from "../../@types/redux/state/ICartData";

interface IBraintreeCheckoutViewProps {
    onPaymentComplete: (string) => void,
    cart: ICartState
    user: UserData
}

interface IBraintreeCheckoutViewState {
}

class BraintreeCheckoutView extends React.Component<IBraintreeCheckoutViewProps, IBraintreeCheckoutViewState> {
    onMessage(m) {
        console.log("Message received:");
        this._hideWebView();
        console.log(m); //crashuje apke

        const items = this.props.cart.items;
        const user = this.props.user;

        const order = new OrderData(null, items, user.email, user.name, ORDER_STATUS.PAID, "0000", "");
        console.log("Will send order:", order);

        CanteenApi.postOrder(order, (res) => {
            console.log("postOrder() RES: ", res);
            if (res.status === "SUCCESS") {
                const data = res.data;
                const code = data.code;

                this.props.onPaymentComplete(code);
            } else {
                console.warn("Something went wrong when postOrder()");
                this.props.onPaymentComplete(null);
            }
        });
    }

    render() {
        const uri = Config.SERVER_INFO.ROOT_URL + ":" + Config.SERVER_INFO.PORT + CANTEEN_API_CONSTANTS.ENDPOINTS.PAYMENTS;
        const cost = this.props.cart.total;

        const injectedScript = 'document.getElementById("amount").value = '+ cost;
        return (
            <WebView
                onLoad={this.onLoad}
                ref={(ref) => { this.webview = ref; }}
                source={{ uri }}
                onNavigationStateChange={(event) => {
                    if (event.url !== uri) {
                        this.webview.stopLoading();
                        Linking.openURL(event.url);
                    }
                }}
                javaScriptEnabled={true}
                injectedJavaScript={injectedScript}//"window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');"
                onMessage={m => this.onMessage(m)}
            />
        );
    }

    private _hideWebView = () => {
        this.setState({showWebView: false});
    }
}

const mapStateToProps = (state: IState) => {
    return {
        cart: state.cart,
        user: state.signIn.user
    }
};

export default connect(mapStateToProps)(BraintreeCheckoutView);

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 40
    },
    logo: {
        width:200
    }
});