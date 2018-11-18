import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

export default class PaymentsScreen extends React.Component {

    render() {
        return (
            <View>
                <Text style={styles.promptText}>Wybierz metode platnosci:</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   promptText: {
       fontFamily: Fonts.family.montserrat_light,
       fontSize: Fonts.sizes.regular,
       fontColor: Colors.black
   }
});