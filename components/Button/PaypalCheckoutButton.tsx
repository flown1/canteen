import React from 'react';
import {
    StyleSheet,
    View,
    WebView
} from 'react-native';

export default class PaypalCheckoutButton extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <WebView source={{html: "<head><script src=\"https://www.paypalobjects.com/api/checkout.js\"></head><body><div id=\"paypal-button-container\">DUPADUPA</div></script><script>paypal.Button.render({ env: 'sandbox',client: {sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R', production: '<insert production client id>'}, commit: true,payment: function(data, actions) {return actions.payment.create({payment: {transactions: [{amount: { total: '0.01', currency: 'PLN' }}]}});},onAuthorize: function(data, actions) {return actions.payment.execute().then(function() {window.alert('Payment Complete!');});}}, '#paypal-button-container'})</script></body>"}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 40
    }
});