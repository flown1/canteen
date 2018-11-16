import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colors from "../../constants/Colors";
import XButton from "../Button/XButton";
import Expo from "expo";
import {IOrderItemProps} from "../../@types/components/Order/OrderItem";

export default class OrderItem extends React.Component<IOrderItemProps> {
    render() {
        return (
            <View style={styles.orderBox}>
                <Text style={styles.orderInfoText}>{this.props.orderItem.quantity}</Text>
                <Image source={{uri: this.props.orderItem.dish.imgUrl }|| {uri: ""}} style={styles.dishImage}/>
                <Text style={styles.orderInfoText}>{this.props.orderItem.dish.namePL}</Text>
                <Text style={styles.orderInfoText}>{this.props.totalPrice}zł</Text>
                <XButton handleOnPress={this._handleOnXPress.bind(this)}/>
            </View>
        );
    }

    private async _quack() {
        const soundObject = new Expo.Audio.Sound();
        const quack = require('../../assets/sounds/high_quality_quack.mp3');
        try {
            await soundObject.loadAsync(quack);
            await soundObject.playAsync()
        } catch (error) {
            console.warn(error.getMessage());
        }
    }

    private _handleOnXPress () {
        this.props.handleOnDelete(this.props.orderItem.dish.id);
    }
}

const styles = StyleSheet.create({
    orderBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: Colors.white,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    dishImage: {
        width: 60
    },
    orderInfoText: {
        fontFamily: 'montserrat-light',
        fontSize: 18,
        color: Colors.black,
        paddingTop: 12
    }
});