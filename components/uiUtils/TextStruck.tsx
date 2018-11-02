import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import ITextStruckProps from "../../@types/components/uiElements/ITextStruckProps";

export default class TextStruck extends React.Component<ITextStruckProps, {}> {

    render() {
        return (
            <View style={styles.flexContainer}>
                <View style={this.props.lineStyle}/>
                <Text style={this.props.textStyle}>{this.props.text}</Text>
                <View style={this.props.lineStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    }
});