import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";
import IMenuScreenProps from "../@types/screens/MenuScreen/IMenuScreenProps";

export default class MenuScreen extends React.Component<IMenuScreenProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Menu</Text>
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