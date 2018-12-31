import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity, View,
    WebView
} from 'react-native';
import {Linking} from "expo";
import {CANTEEN_API_CONSTANTS} from "../../constants/CanteenApi";
import {Config} from "../../config/Config";

const logo = require('../../assets/images/braintree_logo.png');

interface IPaypalCheckoutButtonProps {
}

interface IPaypalCheckoutButtonState {
    check: boolean
}

export default class PaypalCheckoutButton extends React.Component<IPaypalCheckoutButtonProps, IPaypalCheckoutButtonState> {
    state = {
        check: false
    };

    render() {
        const uri = Config.SERVER_INFO.ROOT_URL + ":" + Config.SERVER_INFO.PORT + CANTEEN_API_CONSTANTS.ENDPOINTS.PAYMENTS.BRAINTREE;
        const injectScript = `
          (function () {
            window.onclick = function(e) {
              e.preventDefault();
              window.postMessage(e.target.href);
              e.stopPropagation()
            }
          }());
        `;

        const toRender = this.state.check? <WebView
                ref={(ref) => { this.webview = ref; }}
                source={{ uri }}
                onNavigationStateChange={(event) => {
                    if (event.url !== uri) {
                        this.webview.stopLoading();
                        Linking.openURL(event.url);
                    }
                }}
                injectedJavaScript={injectScript}
                onMessage={this.onMessage}
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
        this._renderWebView();
    };

    private _renderWebView = () => {
        this.setState({check: true});
    };
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