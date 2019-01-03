import React from 'react';
import {
    StyleSheet,
    Text,
    View
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
            <View style={styles.wrapper}>
                <LinearGradient
                    colors={[Colors.red, Colors.crimson]}
                    style={[{top: -12}, {alignItems: 'center' }, styles.container]}>

                    <Text style={styles.label}>Kod twojego zamówienia:</Text>
                    <Text style={styles.code}>{this.props.code}</Text>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        justifyContent: 'center'
    },
    container: {
        height: 200,
        width: 200,
        backgroundColor: Colors.crimson,
        justifyContent:'center',
        borderRadius: 100
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