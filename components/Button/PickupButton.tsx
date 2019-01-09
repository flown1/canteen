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

const xIco = require("../../assets/images/x_ico_white.png");

interface IPickupButtonProps {
    onPress: () => void
}

export default class PickupButton extends React.Component<IPickupButtonProps> {
    render() {
        return (
            <TouchableOpacity onPress={() => this._handleButtonPress()}>
                <LinearGradient
                    colors={[Colors.crimson, Colors.red]}
                    style={[styles.btn, styles.flexRow]}>
                    <Image source={xIco} style={styles.btnIco}/>
                    <Text style={styles.btnText}>Odebrano</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    _handleButtonPress = () => {
        this.props.onPress();
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
    btn: {
        width: 190,
        height: 60,
        borderRadius: 5,
        alignItems: 'center'
    },
    btnIco: {
        width: 40,
        height: 40
    },
    btnText: {
        fontSize: Fonts.sizes.big,
        fontFamily: Fonts.family.montserrat_light,
        color: Colors.white,
        textAlign: 'center',
        justifyContent: 'center'
    }
});