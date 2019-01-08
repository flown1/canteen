import React from 'react';
import {StyleSheet, WebView,} from 'react-native';
import {Linking} from "expo";
import {CANTEEN_API_CONSTANTS} from "../../constants/CanteenApi";
import {Config} from "../../config/Config";
import {connect} from 'react-redux';
import CanteenApi from "../../utils/CanteenApi";
import OrderData from "../../dataModels/OrderData";
import {IState} from "../../@types/redux/state/IState";
import UserData from "../../dataModels/UserData";
import {ORDER_STATUS} from "../../constants/OrderStatus";
import OrderDataItem from "../../dataModels/OrderDataItem";

interface IBraintreeCheckoutViewProps {
    onPaymentComplete: (string) => void,
    items: Array<OrderDataItem>;
    user: UserData
}

interface IBraintreeCheckoutViewState {
}

class BraintreeCheckoutView extends React.Component<IBraintreeCheckoutViewProps, IBraintreeCheckoutViewState> {

    onMessage(m) {
        this._hideWebView();

        const items = this.props.items;
        const user = this.props. user;

        const order = new OrderData(items, user.email, user.name, ORDER_STATUS.PAID, "0000", "");
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
        items: state.cart.items,
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