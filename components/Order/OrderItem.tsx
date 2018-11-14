import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Colors from "../../constants/Colors";
import DishData from "../../dataModels/dishData";
import XButton from "../Button/XButton";
import Expo from "expo";

interface IOrderItemProps {
    dish: DishData
}

export default class OrderItem extends React.Component<IOrderItemProps> {
    render() {
        return (
            <View style={styles.orderBox}>

                    <Text style={styles.orderInfoText}>1x</Text>
                    <Image source={{uri: this.props.dish.imgUrl }|| {uri: ""}} style={styles.dishImage}/>
                    <Text style={styles.orderInfoText}>{this.props.dish.namePL}</Text>
                    <Text style={styles.orderInfoText}>{this.props.dish.price}zł</Text>
                <XButton/>
            </View>
        );
    }

    private async _quack() {

        const soundObject = new Expo.Audio.Sound();
        try {
            await soundObject.loadAsync(require('../../assets/sounds/high_quality_quack.mp3'));
            await soundObject.playAsync()

        } catch (error) {
            console.warn(error.getMessage());

        }
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