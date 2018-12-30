import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View
} from 'react-native';
import Colors from "../../constants/Colors";

export default class Loader extends React.Component {

    render() {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size={'large'} color={Colors.lime}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        backgroundColor:  'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    }
})