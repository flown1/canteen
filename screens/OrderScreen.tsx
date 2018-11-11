import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {IAccountScreenProps} from "../@types/screens/AccountScreen/IAccountProps";



export default class OrderScreen extends React.Component<IAccountScreenProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Order</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'stretch'
    }
});