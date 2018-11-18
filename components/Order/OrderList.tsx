import React from 'react';
import {
    FlatList,
    View
} from 'react-native';
import OrderItem from "./OrderItem";
import OrderData from "../../dataModels/OrderData";
import Dish from "../Menu/DishesList/Dish/Dish";

interface IOrderListProps {
    items: Array<OrderData>;
    deleteItem: (id: string) => void;
}

export default class OrderList extends React.Component<IOrderListProps> {
    state = {
        orderList: Array<OrderData>()
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
                      keyExtractor={this._keyExtractor}
                      renderItem={this._renderItem}/>
        );
    }

    private _handleOnDelete(id: string) {
        this.props.deleteItem(id)
    }
}