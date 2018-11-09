import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import IMenuScreenProps from "../@types/screens/MenuScreen/IMenuScreenProps";
import DishesList from "../components/Menu/DishesList/DishesList";
import Colors from "../constants/Colors";

export default class MenuScreen extends React.Component<IMenuScreenProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Menu</Text>
                <DishesList/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor
    }
});

