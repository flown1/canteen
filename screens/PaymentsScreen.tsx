import React from 'react';
import {
    Button, Modal,
    StyleSheet,
    Text,
    View, WebView
} from 'react-native';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import {CONFIG} from "../config/config";
import {CANTEEN_API_CONSTANTS} from "../constants/CanteenApi";
import Api_keys from "../constants/ApiKeys";
import PaypalCheckoutButton from "../components/Button/PaypalCheckoutButton";

export default class PaymentsScreen extends React.Component {
    state = {
        showModal: false
    };

    render() {
        const paymentsUrl = CONFIG.SERVER_INFO.ROOT_URL + ":" + CONFIG.SERVER_INFO.PORT + CANTEEN_API_CONSTANTS.ENDPOINTS.PAYMENTS.PAYPAL;
        console.log(paymentsUrl);

        return (
            <View style={styles.container}>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false})}
                >
                    <WebView source={{ uri: paymentsUrl }} onNavigationStateChange={data => this._handlePaymentResponse}/>
                </Modal>
                <Text style={styles.promptText}>Wybierz metode platnosci:</Text>
                <PaypalCheckoutButton/>
            </View>
        );
    }

    private _handlePaymentResponse = (data) => {
        console.log("Payment data response: ", data);

    };

    private _handlePaypalPress = async (e) => {
        e.preventDefault();
        console.log('Paying via Paypal...');
        this.setState({showModal: true})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    promptText: {
       fontFamily: Fonts.family.montserrat_light,
       fontSize: Fonts.sizes.regular2,
       color: Colors.black
    }
});