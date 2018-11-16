import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import Colors from "../../constants/Colors";

interface IXButtonProps {
    handleOnPress: () => void
}

export default class XButton extends React.Component<IXButtonProps,{}> {

    render() {
        return (
            <TouchableOpacity onPress={this.props.handleOnPress} style={styles.wrapper}>
                <Text style={styles.theX}>X</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignContent: 'center',
        marginTop: 20
    },
    theX: {
        fontFamily: 'montserrat-light',
        fontSize: 18,
        color: Colors.darkGray
    }
});