import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux'
import {IState} from "../@types/redux/state/IState";
import {ICartScreenProps} from "../@types/screens/CartScreen/ICartScreenProps";
import Colors from "../constants/Colors";
import OrderList from "../components/Order/OrderList";
import {deleteOrderFromCart} from "../redux/actions/cartActions";
import ProceedToPaymentsButton from "../components/Button/ProceesToPaymentsButton";
import OrderData from "../dataModels/OrderData";
import Fonts from "../constants/Fonts";

const cartEmptyImg = require("../assets/images/cart_empty_img.png");

class CartScreen extends React.Component<ICartScreenProps> {

    render() {
        if (this.props.cart.items.length === 0) {
            return (
                <View style={styles.noProductsContainer}>
                    <Text style={styles.title}>Twój Koszyk jest pusty.</Text>
                    <Text style={styles.subtitle}>Twój Koszyk jest smutny :-(((.</Text>
                    <Image source={cartEmptyImg} style={styles.cartEmpty}/>
                </View>
            )
        }
        else {
            let total = 0;
            this.props.cart.items.map( (o: OrderData): number => {
                total += (o.quantity * o.dish.price);
            });

            return (
                <View style={styles.container}>
                    <View style={styles.upperBox}>
                        <Text style={styles.title}>Twoj koszyk:</Text>
                        <OrderList items={this.props.cart.items} deleteItem={this._handleOnDeleteItem}/>
                    </View>
                    <View style={styles.lowerBox}>
                        <View style={styles.totalWrapper}>
                            <Text style={styles.totalLabel}>Total: </Text>
                            <Text style={styles.total}>{total}zł</Text>
                        </View>
                        <ProceedToPaymentsButton onPress={this._handleOnProceedToPaymentsPress}/>
                    </View>
                </View>
            );
        }
    }

    private _handleOnDeleteItem = (id: string) => {
        this.props.onDelete(id);
    };

    private _handleOnProceedToPaymentsPress = () => {
        this.props.navigation.navigate('Payments')
    }
}

const mapStateToProps = (state: IState) => {
    return {
        cart: state.cart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (idToDelete: string) => dispatch(deleteOrderFromCart(idToDelete))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)

const styles = StyleSheet.create({
    noProductsContainer: {
        marginTop: 30,
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    upperBox: {

    },
    lowerBox: {

    },
    title: {
        color: Colors.black,
        fontFamily: Fonts.family.montserrat_light,
        fontSize: 22,
        textAlign: 'center',
        alignItems: 'center'
    },
    subtitle: {
        color: Colors.darkGray,
        fontFamily: Fonts.family.montserrat_light,
        fontSize: 16,
        textAlign: 'center'
    },
    totalWrapper: {
        backgroundColor: Colors.gray,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    totalLabel: {
        fontSize: 22,
        fontFamily: Fonts.family.montserrat_light
    },
    total: {
        fontSize: 22,
        fontFamily: Fonts.family.montserrat_light
    },
    cartEmpty: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    }
});