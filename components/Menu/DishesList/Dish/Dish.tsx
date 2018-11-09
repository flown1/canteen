import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';


export default class Dish extends React.Component<IDishProps, {}> {
    render() {
        return (
            <View styles={styles.box}>
                <Image source={{uri: this.props.imgUrl }|| {uri: ""}} style={styles.img}/>
                <Text>{this.props.name}</Text>
                <Text>{this.props.price}</Text>
                <Text>{this.props.desc}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    shadowBox: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    box: {
        height: 100,
        borderRadius: 5,
        //shadow

    },
    img: {
        height: 100,
        width: 100,
    }
});