import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Logo from "./Text/Logo";
import Colors from "../constants/Colors";

const loopIco = require('../assets/images/search_ico.png');
const cartIco = require('../assets/images/cart_ico.png');

export default class CustomHeader extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View/>
                <View style={styles.logoWrapper}>
                    <Logo size={"medium"}/>
                    <View style={styles.line}/>
                </View>
                <TouchableHighlight onPress={this._handleCartIcoClick}>
                    <View style={styles.cartWrapper}>
                        <Image source={cartIco} style={styles.cartIco}/>
                        <View style={styles.cartNumberWrapper}>
                            <Text style={styles.cartNumber}>1</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._handleSearchIcoClick}>
                    <Image source={loopIco} style={styles.loopIco}/>
                </TouchableHighlight>
            </View>
        );
    }

    private _handleSearchIcoClick = (): void => {
        console.log("Clicked search icon");
    }

    private _handleCartIcoClick = (): void => {
        console.log("Clicked cart button");
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        marginTop: 25,
        marginLeft: 8,
        marginRight: 8
    },
    logoWrapper: {
        justifyContent: 'center'
    },
    line: {
        borderColor: Colors.black,
        borderBottomWidth: 1,
        bottom: 6
    },
    loopIco: {
        height: 30,
        width: 30,
        marginTop: 16
    },
    cartWrapper: {
        flex: 1
    },
    cartNumberWrapper: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: Colors.crimson,
        top: 10,
        left: 20,
        position: 'absolute'
    },
    cartIco: {
        height: 30,
        width: 35,
        top: 20,
        position: 'absolute',

    },
    cartNumber: {
        color: Colors.boneWhite,
        height: 20,
        width: 20,
        textAlign: 'center'
    }
});