import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import Api_keys from "../constants/Api_keys";


export default class PaymentsScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.promptText}>Wybierz metode platnosci:</Text>
                <Button onPress={this._handleStripePresss} title="Stripe"></Button>
            </View>
        );
    }

    private _handleStripePresss = async () => {
        console.log('Paying via Stripe...');

        /*** STRIPE CONFIG ***/
        Stripe.setOptionsAsync({
            publishableKey: Api_keys.PAYMENTS.STRIPE, // Your key
        });

        const params = {
            // mandatory
            number: '4242424242424242',
            expMonth: 11,
            expYear: 17,
            cvc: '223',
            // optional
            name: 'Test User',
            currency: 'usd',
            addressLine1: '123 Test Street',
            addressLine2: 'Apt. 5',
            addressCity: 'Test City',
            addressState: 'Test State',
            addressCountry: 'Test Country',
            addressZip: '55555',
        };

        // const token = await Stripe.createTokenWithCardAsync(params).then( (result) => {
        //     console.log(`STRIPE Result: `, result);
        // }).catch( (e) => {
        //     console.warn(`Couldn't make payment using Stripe because of ${e.getMessage()}.`);
        // });
        // console.log("STRIPE TOKEN: ", token);
        debugger;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    promptText: {
       fontFamily: Fonts.family.montserrat_light,
       fontSize: Fonts.sizes.regular,
       color: Colors.black
    }
});