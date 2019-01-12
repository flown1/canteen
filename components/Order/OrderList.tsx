import React from 'react';
import {
    FlatList,
    StyleSheet
} from 'react-native';
import OrderItem from "./OrderItem";
import OrderDataItem from "../../dataModels/OrderDataItem";

interface IOrderListProps {
    items: Array<OrderDataItem>;
    deleteItem: (orderDataItem: OrderDataItem) => void;
}

export default class OrderList extends React.Component<IOrderListProps> {
    state = {
        orderList: Array<OrderDataItem>()
    };

    private _keyExtractor = (item, index) => index.toString();

    private _renderItem = ({item: o, index: index }) => {
        return (
            <OrderItem key={index} orderItem={o} totalPrice={o.quantity * o.dish.price} handleOnDelete={this._handleOnDelete.bind(this)}/>
        );
    };

    render() {
        return (
            <FlatList data={this.props.items}
                      style={styles.orderListWrapper}
                      keyExtractor={this._keyExtractor}
                      renderItem={this._renderItem}/>
        );
    }

    private _handleOnDelete(orderDataItem: OrderDataItem) {
        this.props.deleteItem(orderDataItem)
    }
}

const styles = StyleSheet.create({
    orderListWrapper: {
        marginTop: 15,
        paddingRight:8,
        paddingLeft:8,
    }
});