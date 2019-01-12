import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colors from "../../constants/Colors";

interface ILogoProps {
    size: string
}

export default class Logo extends React.Component<ILogoProps, {}> {

    render() {
        const size = this.props.size;
        let logo;
        switch(size) {
            case "large":
                logo = <Text style={[styles.logo, styles.logoLarge]}>Canteen</Text>;
                break;
            case "medium":
                logo = <Text style={[styles.logo, styles.logoMedium]}>Canteen</Text>;
                break;
            default:
                logo = <Text style={styles.logo}>Canteen</Text>;
                break;
        }
        return (
            <View>
                {logo}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        fontFamily: 'scriptmt-bold',
        color: Colors.black,
        textAlign: 'center'
    },
    logoLarge: {
        fontSize: 76,
    },
    logoMedium: {
        fontSize: 45
    },
    line: {
        borderColor: Colors.black,
        borderBottomWidth: 1,
        bottom: 6
    }
});