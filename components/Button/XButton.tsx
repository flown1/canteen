import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colors from "../../constants/Colors";

export default class XButton extends React.Component {

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.theX}>X</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignContent: 'center'
    },
    theX: {
        fontFamily: 'montserrat-light',
        fontSize: 22,
        color: Colors.darkGray
    }
});