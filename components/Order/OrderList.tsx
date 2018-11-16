import React from 'react';
import {
    View
} from 'react-native';
import OrderItem from "./OrderItem";
import OrderData from "../../dataModels/OrderData";

interface IOrderListProps {
    items: Array<OrderData>;
    deleteItem: (id: string) => void;
}

export default class OrderList extends React.Component<IOrderListProps> {
    state = {
        orderList: Array<OrderData>()
    };

    render() {
        return (
            <View>
                {this.props.items.map((o: OrderData, index: number) => {
                    return <OrderItem key={index} orderItem={o} totalPrice={o.quantity * o.dish.price} handleOnDelete={this._handleOnDelete.bind(this)}/>
                })}
            </View>
        );
    }

    private _handleOnDelete(id: string) {
        this.props.deleteItem(id)
    }
}