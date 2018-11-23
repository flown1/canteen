import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {LinearGradient} from "expo";

interface IProProceedToPaymentsButtonProps {
    onPress: () => void
}

export default class ProceedToPaymentsButton extends React.Component<IProProceedToPaymentsButtonProps> {
    render() {
        return (
            <TouchableOpacity style={styles.wrapper} onPress={this.props.onPress}>
                <LinearGradient
                    colors={[Colors.red, Colors.crimson]}
                    style={[{top: -12}, {alignItems: 'center' }]}>
                    <Text style={styles.buttonText}>Zapłać >></Text>
                </LinearGradient>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        backgroundColor: Colors.crimson,
        height: 60
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: Fonts.sizes.large,
        fontFamily: Fonts.family.montserrat_light,
        color: Colors.white,
        textAlign: 'center',
        justifyContent: 'center'
    }
});