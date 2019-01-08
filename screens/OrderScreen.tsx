import React from 'react';
import {StyleSheet, View, Text, RefreshControl, ScrollView} from "react-native";
import { connect } from 'react-redux';
import {IState} from "../@types/redux/state/IState";
import IReactNavigateProps from "../@types/@react-navigation/IReactNavigateProps";
import UserData from "../dataModels/UserData";
import {USER_ROLES} from "../constants/UserRoles";
import OrderData from "../dataModels/OrderData";
import OrderList from "../components/OrderList/OrderList";
import CanteenApi from "../utils/CanteenApi";
import Colors from "../constants/Colors";


interface IOrderScreenProps {
    navigation: IReactNavigateProps
    user: UserData
}

interface IOrderScreenState {
    orders: Array<OrderData>
    isOrderListLoaded: boolean
    isRefreshing: boolean
}

class OrderScreen extends React.Component<IOrderScreenProps, IOrderScreenState> {

    constructor(props) {
        super(props);

        this.state = {
            orders: null,
            isOrderListLoaded: false,
            isRefreshing: false
        }
    }

    componentDidMount(): void {
        this._fetchOrders()
    }

    render() {
        const isAdmin = this.props.user.role === USER_ROLES.ADMIN;
        const toRender = isAdmin?
            <OrderList orders={this.state.orders} isLoaded={this.state.isOrderListLoaded}/>
            :
            <Text>Zwykla lista dla klienta</Text>;

        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
            >
                {toRender}
            </ScrollView>
        );
    }

    _onRefresh = () : void => {
        console.log("Refreshing...");
        this._fetchOrders();
    };

    _stopRefreshing = () : void => {
        this.setState({isRefreshing: false});
    };

    _ordersLoaded = () : void => {
        this.setState({isOrderListLoaded: true});
    };

    _fetchOrders = () : void => {
        CanteenApi.getAllOrders((res) => {
            if(res.status === "SUCCESS"){
                console.log("Got this response from getAllOrders:", res);
                const data = res.data;
                const orders = data.orders;

                this.setState({orders: orders});
            }

            this._ordersLoaded();
            this._stopRefreshing();
        })
    }
}

const mapStateToProps = (state: IState) => {
    return {
        user: state.signIn.user
    }
};

export default connect(mapStateToProps, null)(OrderScreen);
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor
    },
});