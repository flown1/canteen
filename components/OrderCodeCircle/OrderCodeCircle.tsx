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
    size: String
}

interface IOrderCodeCircleState {

}

export default class OrderCodeCircle extends React.Component<IOrderCodeCircleProps, IOrderCodeCircleState> {

    render() {
        const toRender = this.props.size === "LARGE" ?
            <LinearGradient
                colors={[Colors.red, Colors.crimson]}
                style={[{top: -12}, {alignItems: 'center' }, styles.containerLarge]}>

                <Text style={styles.labelLarge}>Kod twojego zamówienia:</Text>
                <Text style={styles.codeLarge}>{this.props.code}</Text>
            </LinearGradient>
            :
            <LinearGradient
                colors={[Colors.red, Colors.crimson]}
                style={[{top: -12}, {alignItems: 'center' }, styles.containerSmall]}>

                <Text style={styles.labelSmall}>Kod zamówienia:</Text>
                <Text style={styles.codeSmall}>{this.props.code}</Text>
            </LinearGradient>;

        return (
            <>
                {toRender}
            </>
        );
    }
}

const styles = StyleSheet.create({
    containerLarge: {
        height: 200,
        width: 200,
        backgroundColor: Colors.crimson,
        justifyContent:'center',
        borderRadius: 100,
        marginTop: 20,

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 0.2
    },
    containerSmall: {
        height: 100,
        width: 100,
        backgroundColor: Colors.crimson,
        justifyContent:'center',
        borderRadius: 100,
        marginTop: 20,

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 0.2
    },
    labelLarge: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.small,
        color: Colors.white,
        textAlign: 'center'
    },
    labelSmall: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.small,
        color: Colors.white,
        textAlign: 'center'
    },
    codeLarge: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.large,
        color: Colors.white,
        textAlign: 'center'
    },
    codeSmall: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular2,
        color: Colors.white,
        textAlign: 'center'
    }
});