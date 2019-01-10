import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView, RefreshControl} from "react-native";
import ArchiveList from "../components/ArchiveList/ArchiveList";
import OrderData from "../dataModels/OrderData";
import IReactNavigateProps from "../@types/@react-navigation/IReactNavigateProps";
import UserData from "../dataModels/UserData";
import {USER_ROLES} from "../constants/UserRoles";
import CanteenApi from "../utils/CanteenApi";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import { connect } from 'react-redux';
import {IState} from "../@types/redux/state/IState";

const noOrdersImage = require("../assets/images/no_orders.png");

interface IArchiveScreenProps {
    navigation: IReactNavigateProps
    user: UserData
}
interface IArchiveScreenState {
    orders: Array<OrderData>
    isOrderListLoaded: boolean
    isRefreshing: boolean
}

class ArchiveScreen extends React.Component<IArchiveScreenProps, IArchiveScreenState> {
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
        const orders = this.state.orders;
        const toRender = orders && orders.length > 0?
            <ArchiveList orders={this.state.orders} isLoaded={this.state.isOrderListLoaded}/>
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

    _fetchOrders = () : void => {
        const user = this.props.user;
        const isAdmin = user.role === USER_ROLES.ADMIN;
        const email = user.email;

        if (isAdmin) {
            CanteenApi.getOrdersArchive(email, (res) => {
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
            CanteenApi.getUserOrdersArchive(email,(res) => {
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
export default connect(mapStateToProps)(ArchiveScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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