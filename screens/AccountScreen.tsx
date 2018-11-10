import React from 'react';
import {StyleSheet, View, Text, Button} from "react-native";
import {ISettingsScreenProps} from "../@types/screens/SettingsScreen/ISettingsProps";

export default class AccountScreen extends React.Component<ISettingsScreenProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Account</Text>
                <Button onPress={this._handleLogoutPress} title={"Wyloguj"}/>
            </View>
        );
    }

    private _handleLogoutPress = () : void => {
        console.log("Signing out...")
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