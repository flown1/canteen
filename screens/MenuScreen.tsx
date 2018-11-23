import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import IMenuScreenProps from "../@types/screens/MenuScreen/IMenuScreenProps";
import DishesList from "../components/Menu/DishesList/DishesList";
import Colors from "../constants/Colors";
import Filter from "../components/Filter/Filter";

export default class MenuScreen extends React.Component<IMenuScreenProps> {

    render() {
        return (
            <View style={styles.container}>
                <Filter/>
                <Text style={styles.sectionLabel}>Menu na dzis:</Text>
                <DishesList/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor
    },
    sectionLabel: {
        fontFamily: 'montserrat-light',
        fontSize: 22,
        color: Colors.black
    }
});

