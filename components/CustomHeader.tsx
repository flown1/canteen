import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import Logo from "./Text/Logo";
import Colors from "../constants/Colors";

const loopIco = require('../assets/images/search_ico.png');

export default class CustomHeader extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View/>
                <View style={styles.logoWrapper}>
                    <Logo size={"medium"}/>
                    <View style={styles.line}/>
                </View>
                <TouchableHighlight onPress={this._handleSearchIcoClick}>
                    <Image source={loopIco} style={styles.loopIco}/>
                </TouchableHighlight>
            </View>
        );
    }

    private _handleSearchIcoClick = (): void => {
        console.log("Clicked search icon");
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
    }
});