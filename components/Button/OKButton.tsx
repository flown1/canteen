import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

interface IOKButtonProps {
    onPress: () => void
}

export default class OKButton extends React.Component<IOKButtonProps> {
    render() {
        return (
            <TouchableOpacity style={styles.wrapper} onPress={this.props.onPress}>
                <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        backgroundColor: Colors.green,
        height: 80,
        width: 200,
        borderRadius: 5,

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: Fonts.sizes.regular2,
        fontFamily: Fonts.family.montserrat_light,
        color: Colors.white,
        textAlign: 'center',
        justifyContent: 'center'
    }
});