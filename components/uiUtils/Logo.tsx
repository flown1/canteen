import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colors from "../../constants/Colors";

export default class Logo extends React.Component {

    render() {
        return (
            <View>
                <Text style={styles.logo}>Canteen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 76,
        fontFamily: 'scriptmt-bold',
        color: Colors.black,
        textAlign: 'center'
    }
});