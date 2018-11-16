import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import Colors from "../../constants/Colors";

interface IProProceedToPaymentsButtonProps {
    onPress: () => void
}

export default class ProceedToPaymentsButton extends React.Component<IProProceedToPaymentsButtonProps> {
    render() {
        return (
            <TouchableOpacity style={styles.wrapper} onPress={this.props.onPress}>
                <Text style={styles.buttonText}>Zapłać >>></Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.crimson,
        height: 200
    },
    buttonText: {
        fontSize: 22,
        color: Colors.white,
        textAlign: 'center'
    }
});