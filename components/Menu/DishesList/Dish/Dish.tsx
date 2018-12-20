import React from 'react';
import {
    Animated,
    GestureResponderEvent,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Colors from "../../../../constants/Colors";
import {LinearGradient} from "expo";
import {IDishProps} from "../../../../@types/components/Menu/DishList/Dish/IDishProps";

const plusIco = require('../../../../assets/images/plus.png');

interface IFadeInViewProps {
    style ?: Object
}

class FadeInViewAnim extends React.Component<IFadeInViewProps, {}> {
    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    };

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 300,
            }
        ).start();
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default class Dish extends React.Component<IDishProps, {}> {

    render() {
        return (
            <FadeInViewAnim>
            <View style={styles.box}>
                <View style={styles.leftPart}>
                    <Image source={{uri: this.props.dish.imgUrl }|| {uri: ""}} style={styles.img}/>
                </View>
                <View style={styles.rightPart}>
                    <View style={styles.rightUp}>
                        <Text style={styles.name}>{this.props.dish.namePL}</Text>
                        <TouchableHighlight style={styles.orderBtn} onPress={(e: GestureResponderEvent) => this._handleOrderBtnPress(e)}>
                            <LinearGradient
                                colors={[Colors.primary, Colors.green]}
                                                  style={[styles.flexRow, { borderRadius: 5, alignItems: 'center' }]}>
                                    <Image source={plusIco} style={styles.plusIco}/>
                                    <Text style={styles.orderBtnText}>Zamów</Text>
                            </LinearGradient>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.rightDown}>
                        <Text style={styles.desc}>{this.props.dish.descPL}</Text>
                        <View style={styles.price}>
                            <Text style={styles.biggerNumber}>{this.props.dish.price.toString().split(".")[0]}.</Text>
                            <Text style={styles.smallerNumber}>{this.props.dish.price.toString().split(".")[1]}</Text>
                            <Text style={styles.currency}>zł</Text>
                        </View>
                    </View>
                </View>
            </View>
            </FadeInViewAnim>
        );
    }

    private _handleOrderBtnPress = (e : GestureResponderEvent) : void => {
        e.preventDefault();

        this.props.addToCart(this.props.dish);
    }
}

const styles = StyleSheet.create({
    box: {
        height: 85,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginBottom: 10,

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    },
    leftPart: {
        width: 110
    },
    rightPart: {
        width: 250,
        paddingTop: 5,
        paddingBottom: 5,
        
        paddingRight: 2
    },
    img: {
        height: 85,
        width: 98,
        borderRadius: 4
    },
    rightUp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1
    },
    rightDown: {
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'space-between'
    },
    name: {
        fontSize: 21,
        color: Colors.black,
        fontFamily: 'montserrat-light'
    },
    orderBtn: {
        width: 86,
        height: 35,
        borderRadius: 4,
        backgroundColor: Colors.lime
    },
    plusIco: {
        width: 20,
        height: 20
    },
    orderBtnText: {
        height: 35,
        width: 86,
        top: 6,

        color: Colors.white,
        backgroundColor: 'transparent',
        fontSize: 17,
        fontFamily: 'montserrat-light'
    },
    desc: {
        width: 170,
        color: Colors.gray
    },
    price: {
        display: 'flex',
        flexDirection: 'row',

        alignItems: "center"
    },
    biggerNumber: {
        fontFamily: 'montserrat-light',
        fontSize: 25,
    },
    smallerNumber: {
        fontFamily: 'montserrat-light',
        fontSize: 14,
        top: 4
    },
    currency: {
        fontFamily: 'montserrat-light',
        fontSize: 25,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
});