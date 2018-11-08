import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {ISettingsScreenProps} from "../@types/screens/SettingsScreen/ISettingsProps";



export default class SettingsScreen extends React.Component<ISettingsScreenProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
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