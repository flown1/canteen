import React from 'react';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight, TouchableHighlightComponent,
    View
} from 'react-native';
import Colors from "../../../../constants/Colors";
import {LinearGradient} from "expo";

const plusIco = require('../../../../assets/images/plus.png');

export default class Dish extends React.Component<IDishProps, {}> {
    render() {
        return (
            <View style={styles.box}>
                <View style={styles.leftPart}>
                    <Image source={{uri: this.props.imgUrl }|| {uri: ""}} style={styles.img}/>
                </View>
                <View style={styles.rightPart}>
                    <View style={styles.rightUp}>
                        <Text style={styles.name}>{this.props.name}</Text>
                        <TouchableHighlight style={styles.orderBtn} onPress={this._handleOrderBtnPress}>
                            <LinearGradient
                                colors={[Colors.primary, Colors.green]}
                                                  style={[styles.flexRow, { borderRadius: 5, alignItems: 'center' }]}>
                                    <Image source={plusIco} style={styles.plusIco}/>
                                    <Text style={styles.orderBtnText}>Zamów</Text>
                            </LinearGradient>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.rightDown}>
                        <Text style={styles.desc}>{this.props.desc}</Text>
                        <View style={styles.price}>
                            <Text style={styles.biggerNumber}>{this.props.price.toString().split(".")[0]}.</Text>
                            <Text style={styles.smallerNumber}>{this.props.price.toString().split(".")[1]}</Text>
                            <Text style={styles.currency}>zł</Text>

                        </View>
                    </View>
                </View>
            </View>
        );
    }

    private _handleOrderBtnPress = (e : Event) : void => {
        e.preventDefault();
        console.log(`Ordered ${this.props.name}!`);
    }
}

const styles = StyleSheet.create({
    box: {
        height: 85,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.white
    },
    leftPart: {
        width: 110
    },
    rightPart: {
        width: 260,
        paddingTop: 5,
        paddingBottom: 5,
        
        paddingRight: 2
    },
    img: {
        height: 85,
        width: 98,
        borderRadius: 4
    },
    rightUp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1
    },
    rightDown: {
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'space-between'
    },
    name: {
        fontSize: 21,
        color: Colors.black,
        fontFamily: 'montserrat-light'
    },
    orderBtn: {
        width: 86,
        height: 35,
        borderRadius: 4,
        backgroundColor: Colors.lime
    },
    plusIco: {
        width: 20,
        height: 20
    },
    orderBtnText: {
        height: 35,
        width: 86,
        top: 6,

        color: Colors.white,
        backgroundColor: 'transparent',
        fontSize: 17,
        fontFamily: 'montserrat-light'
    },
    desc: {
        width: 170,
        color: Colors.gray
    },
    price: {
        display: 'flex',
        flexDirection: 'row',

        alignItems: "center"
    },
    biggerNumber: {
        fontFamily: 'montserrat-light',
        fontSize: 25,
    },
    smallerNumber: {
        fontFamily: 'montserrat-light',
        fontSize: 14,
        top: 4
    },
    currency: {
        fontFamily: 'montserrat-light',
        fontSize: 25,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
});