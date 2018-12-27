import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {LinearGradient} from "expo";

const plusIco = require("../../assets/images/plus.png");

interface IAddDishButtonProps {
    onPress: () => void
}

export default class EditDishButton extends React.Component<IAddDishButtonProps> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <LinearGradient
                    colors={[Colors.yellow, Colors.orange]}
                    style={[styles.wrapper, styles.flexRow, {top: -12}, {alignItems: 'center' }]}>
                    {/*<Image source={plusIco} style={styles.plusIco}/>*/}
                    <Text style={styles.buttonText}>Edytuj</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        backgroundColor: Colors.darkGreen,
        height: 60,
        marginTop: 15,
        marginRight: 8,
        marginBottom: 10,
        marginLeft: 8
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    btnIco: {
        width: 20,
        height: 20
    },
    buttonText: {
        fontSize: Fonts.sizes.big,
        fontFamily: Fonts.family.montserrat_light,
        color: Colors.white,
        textAlign: 'center',
        justifyContent: 'center'
    }
});