import React from 'react';
import {StyleSheet, View, Text, RefreshControl, ScrollView, Image} from "react-native";
import { connect } from 'react-redux';
import {IState} from "../@types/redux/state/IState";
import IReactNavigateProps from "../@types/@react-navigation/IReactNavigateProps";
import UserData from "../dataModels/UserData";
import {USER_ROLES} from "../constants/UserRoles";
import OrderData from "../dataModels/OrderData";
import OrderList from "../components/OrderList/OrderList";
import CanteenApi from "../utils/CanteenApi";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import UserOrderList from "../components/UserOrderList/UserOrderList";

const noOrdersImage = require("../assets/images/no_orders.png");

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
        const orders = this.state.orders;
        const toRender = orders && orders.length > 0?
            isAdmin?
                <OrderList orders={this.state.orders} isLoaded={this.state.isOrderListLoaded} onDestroy={() => this._handleOnDestroy.bind(this)}/>
                :
                <UserOrderList orders={this.state.orders} isLoaded={this.state.isOrderListLoaded} onDestroy={() => this._handleOnDestroy.bind(this)}/>
            :
            <View style={styles.noOrdersContainer}>
                <Text style={styles.noOrdersText}>Brak nowych zamówień</Text>
                <Text style={styles.note}>Pociągnij w dół, aby odświeżyć...</Text>
                <Image source={noOrdersImage} style={styles.noOrdersImage}/>
            </View>;

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

    _handleOnDestroy = (order: OrderData) :void => {
        const newOrders = this.state.orders.filter((o: OrderData) => {
            return o !== order;
        });

        this.setState({orders: newOrders});
    };

    _fetchOrders = () : void => {
        const user = this.props.user;
        const isAdmin = user.role === USER_ROLES.ADMIN;
        if (isAdmin) {
            CanteenApi.getIncompleteOrders((res) => {
                if (res.status === "SUCCESS") {
                    const data = res.data;
                    const orders = data.orders;

                    this.setState({orders: orders});
                }

                this._ordersLoaded();
                this._stopRefreshing();
            })
        } else {
            const email = user.email;
            CanteenApi.getUserOrders(email,(res) => {
                if (res.status === "SUCCESS") {
                    const data = res.data;
                    const orders = data.orders;

                    this.setState({orders: orders});
                }

                this._ordersLoaded();
                this._stopRefreshing();
            })
        }
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
    noOrdersContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    noOrdersText: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.big
    },
    noOrdersImage: {

    },
    note: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.small,
        color: Colors.darkGray
    }
});