import React from 'react';
import {
    FlatList,
    StyleSheet
} from 'react-native';
import OrderData from "../../dataModels/OrderData";
import Loader from "../Loader/Loader";
import OrderListItem from "./OrderListItem/OrderListItem";

interface IOrderListProps {
    isLoaded: boolean
    orders: Array<OrderData>
}

export default class OrderList extends React.Component<IOrderListProps> {

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item: o }) => {
        return (
            <OrderListItem order={o}/>
        );
    };

    render() {
        const orders = this.props.orders;

        if(!this.props.isLoaded){
            return (
                <Loader/>
            )
        } else {
            return(
                <FlatList style={styles.orderListWrapper}
                          data={orders}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderItem}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    orderListWrapper: {
        paddingLeft: 5,
        paddingRight: 5
    }
});