import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import PaypalCheckoutButton from "../components/Button/PaypalCheckoutButton";

interface IPaymentsScreenProps {

}

interface IPaymentsScreenState {

}

export default class PaymentsScreen extends React.Component<IPaymentsScreenProps, IPaymentsScreenState> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.promptText}>Wybierz metode platnosci:</Text>
                <PaypalCheckoutButton/>
            </View>
        );
    }
}

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
    }
});