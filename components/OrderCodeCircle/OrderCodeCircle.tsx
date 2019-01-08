import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import {LinearGradient} from "expo";

interface IOrderCodeCircleProps {
    code: String
}

interface IOrderCodeCircleState {

}

export default class OrderCodeCircle extends React.Component<IOrderCodeCircleProps, IOrderCodeCircleState> {
    render() {
        return (
            <LinearGradient
                colors={[Colors.red, Colors.crimson]}
                style={[{top: -12}, {alignItems: 'center' }, styles.container]}>

                <Text style={styles.label}>Kod twojego zamówienia:</Text>
                <Text style={styles.code}>{this.props.code}</Text>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 200,
        backgroundColor: Colors.crimson,
        justifyContent:'center',
        borderRadius: 100,

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 0.2
    },
    label: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.small,
        color: Colors.white,
        textAlign: 'center'
    },
    code: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.large,
        color: Colors.white,
        textAlign: 'center'
    }
});