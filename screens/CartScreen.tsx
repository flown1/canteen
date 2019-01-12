import React from 'react';
import {
    Button,
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
import OrderDataItem from "../dataModels/OrderDataItem";
import Fonts from "../constants/Fonts";

const cartEmptyImg = require("../assets/images/cart_empty_img.png");

class CartScreen extends React.Component<ICartScreenProps> {

    render() {
        if (this.props.cart.items.length === 0) {
            return (
                <View style={styles.noProductsContainer}>
                    <Text style={styles.title}>Twój Koszyk jest pusty.</Text>
                    <Text style={styles.subtitle}>Twój Koszyk jest smutny :-(((.</Text>
                    <View style={styles.cartEmptyImgWrapper}>
                        <Image source={cartEmptyImg} style={styles.cartEmpty}/>
                    </View>
                    <Button title=" << Powrót" onPress={ () => this.props.navigation.navigate('Menu') } />
                </View>
            )
        } else {
            let total = 0;
            this.props.cart.items.map( (o: OrderDataItem): void => {
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
                            <Text style={styles.totalLabel}>Całkowity koszt: </Text>
                            <View style={styles.totalWrapperCost}>
                                <Text style={styles.total}>{total.toString().split(".")[0]}.</Text>
                                <Text style={[styles.total, styles.totalSmaller]}>{total.toString().split(".")[1]}zł</Text>
                            </View>
                        </View>
                        <ProceedToPaymentsButton onPress={this._handleOnProceedToPaymentsPress}/>
                    </View>
                </View>
            );
        }
    }

    private _handleOnDeleteItem = (orderDataItem: OrderDataItem) => {
        this.props.onDelete(orderDataItem);
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
        onDelete: (orderDataItem: OrderDataItem) => dispatch(deleteOrderFromCart(orderDataItem))
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
        height: 55,
        marginTop: 14,
        backgroundColor: Colors.gray,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    totalWrapperCost: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    totalLabel: {
        fontSize: Fonts.sizes.big,
        fontFamily: Fonts.family.montserrat_light,
        marginLeft: 15
    },
    total: {
        fontSize: Fonts.sizes.regular2,
        fontFamily: Fonts.family.montserrat_light,
        marginTop: 5
    },
    totalSmaller: {
        fontSize: Fonts.sizes.small,
        fontFamily: Fonts.family.montserrat_light,
        marginTop: 10,
        marginRight: 18
    },
    cartEmptyImgWrapper: {
        alignItems: 'center'
    },
    cartEmpty: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    }
});