import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Colors from "../../../../constants/Colors";
import {LinearGradient} from "expo";

export default class Dish extends React.Component<IDishProps, {}> {
    render() {
        return (
            <View style={styles.box}>
                <View style={styles.leftPart}>
                    <Image source={{uri: this.props.imgUrl }|| {uri: ""}} style={styles.img}/>
                </View>
                <View style={styles.rightPart}>
                    <View style={styles.rightUp}>
                        <Text style={styles.name}>{this.props.name}</Text>
                        <TouchableHighlight style={styles.orderBtn} onPress={this._handleOrderBtnPress}>
                            <LinearGradient
                                colors={[Colors.primary, Colors.green]}
                                                  style={{ padding: 17, borderRadius: 5 }}>
                                <Text style={styles.orderBtnText}>Zamów</Text>
                            </LinearGradient>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.rightDown}>
                        <Text>{this.props.desc}</Text>
                        <Text>{this.props.price}</Text>
                    </View>
                </View>

            </View>
        );
    }

    private _handleOrderBtnPress = (e : Event) : void => {
        e.preventDefault();
        console.log(`Ordered ${this.props.name}!`);
    }
}

const styles = StyleSheet.create({
    box: {
        height: 85,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.white
    },
    leftPart: {
        width: 110
    },
    rightPart: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 2,
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
        height: 32,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1
    },
    rightDown: {
        display: 'flex',
        flexDirection: 'row',

    },
    name: {
        fontSize: 21,
        color: Colors.black,
        fontFamily: 'montserrat-light'
    },
    orderBtn: {
        width: 86,
        height: 25,
        borderRadius: 4,
        backgroundColor: Colors.lime
    },
    orderBtnText: {
        bottom: 15,
        color: Colors.white,
        fontSize: 17,
        fontFamily: 'montserrat-light'
    }
});