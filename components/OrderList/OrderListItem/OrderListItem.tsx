import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import OrderData from "../../../dataModels/OrderData";
import Colors from "../../../constants/Colors";

interface IOrderListItemProps {
    order: OrderData
}

export default class OrderListItem extends React.Component<IOrderListItemProps, {}> {

    render() {
        console.log("OrderListItem's props:", this.props);
        const order = this.props.order;

        const {items, date, status, code} = order;

        return (
            <View style={styles.box}>
                <Text>{date || "---"}</Text>
                <Text>Kod: {code || "----" }</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
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
    }
});