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

const readyIco = require("../../assets/images/ready_ico_white.png");

interface IReadyButtonProps {
    onPress: () => void
}

export default class ReadyButton extends React.Component<IReadyButtonProps> {
    render() {
        return (
            <TouchableOpacity onPress={() => this._handleButtonPress()}>
                <LinearGradient
                    colors={[Colors.primary, Colors.green]}
                    style={[styles.btn, styles.flexRow]}>
                    <Image source={readyIco} style={styles.btnIco}/>
                    <Text style={styles.btnText}>Gotowe</Text>
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
        width: 150,
        height: 60,
        borderRadius: 5,
        alignItems: 'center'
    },
    btnIco: {
        width: 26,
        height: 26
    },
    btnText: {
        fontSize: Fonts.sizes.big,
        fontFamily: Fonts.family.montserrat_light,
        color: Colors.white,
        textAlign: 'center',
        justifyContent: 'center'
    }
});