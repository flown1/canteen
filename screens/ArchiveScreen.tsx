import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import {IAccountScreenProps} from "../@types/screens/AccountScreen/IAccountProps";



export default class ArchiveScreen extends React.Component<IAccountScreenProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Archive</Text>
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