import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity, WebView,
} from 'react-native';
import {Linking} from "expo";
import {CANTEEN_API_CONSTANTS} from "../../constants/CanteenApi";
import {Config} from "../../config/Config";

const logo = require('../../assets/images/braintree_logo.png');

interface IBraintreeCheckoutButtonProps {
    onPaymentComplete: () => void
}

interface IBraintreeCheckoutButtonState {
    showWebView: boolean,
}

export default class BraintreeCheckoutButton extends React.Component<IBraintreeCheckoutButtonProps, IBraintreeCheckoutButtonState> {
    state = {
        showWebView: false,
    };

    onMessage(m) {
        this._hideWebView();
        this.props.onPaymentComplete();
    }

    render() {
        const uri = Config.SERVER_INFO.ROOT_URL + ":" + Config.SERVER_INFO.PORT + CANTEEN_API_CONSTANTS.ENDPOINTS.PAYMENTS.BRAINTREE;

        const toRender = this.state.showWebView? <WebView
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
        :
        <TouchableOpacity style={styles.container} onPress={this._handleOnPress}>
            <Image source={logo} style={styles.logo}/>
        </TouchableOpacity>;

        return (
            <>
                {toRender}
            </>
        );
    }

    private _handleOnPress = () => {
        this._showWebView();
    };

    private _showWebView = () => {
        this.setState({showWebView: true});
    };

    private _hideWebView = () => {
        this.setState({showWebView: false});
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 40
    },
    logo: {
        width:200
    }
});