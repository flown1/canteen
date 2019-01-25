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
    onMessage = (m) => {
        console.log("Message received:");
        this._hideWebView();
        // console.log(m.nativeEvent.data);
        // console.log(m);

        const items = this.props.cart.items;
        const user = this.props.user;

        const order = new OrderData(null, items, user.email, user.name, ORDER_STATUS.PAID, "0000", "");

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
    };

    _postOrderAndFallback = () => {
        console.log("Message received:");

        const items = this.props.cart.items;
        const user = this.props.user;

        const order = new OrderData(null, items, user.email, user.name, ORDER_STATUS.PAID, "0000", "");

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
    };

    render() {
        const uri = Config.SERVER_INFO.ROOT_URL + ":" + Config.SERVER_INFO.PORT + CANTEEN_API_CONSTANTS.ENDPOINTS.PAYMENTS;
        const cost = this.props.cart.total;

        const injectedScript = 'document.getElementById("amount").value = '+ cost + "; window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');";


        const fix = `(function() {
            var originalPostMessage = window.postMessage;
            
            document.getElementById("amount").value = ${cost};


            var patchedPostMessage = function(message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };

            patchedPostMessage.toString = function() {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };

            window.postMessage = patchedPostMessage;
        })()`;
        let self = this;

        return (
            <WebView
                // onLoad={this.onLoad}
                // ref={(ref) => { this.webview = ref; }}
                // originWhitelist={['*']}
                source={{ uri }}
                onNavigationStateChange={(event) => {
                    console.log("------------");
                    console.log("Event:", event);
                    console.log("event.url: ", event.url);
                    console.log("uri: ", uri);

                    console.log("Is event.url different from uri:", event.url != uri);

                    if (event.url === "http://192.168.69.100:3000/success") {
                        console.log("onNavigationStateChanged");
                        self._hideWebView();
                        // Linking.openURL(event.url);
                    }
                }}
                javaScriptEnabled={true}
                injectedJavaScript={fix}
                onMessage={() => {}}
            />
        );
    }

    private _hideWebView = () => {
        console.log("triggered _hideWebView");

        this._postOrderAndFallback();
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