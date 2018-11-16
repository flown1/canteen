import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux'
import {IState} from "../@types/redux/state/IState";
import {ICartScreenProps} from "../@types/screens/CartScreen/ICartScreenProps";
import Colors from "../constants/Colors";
import OrderList from "../components/Order/OrderList";

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
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Twoj koszyk:</Text>
                    <OrderList items={this.props.cart.items} deleteItem={this._handleOnDeleteItem.bind(this)}/>
                </View>
            );
        }
    }

    private _handleOnDeleteItem(id: string) {
        console.log(`gonna delete: ${id}`);
    }
}

const mapStateToProps = (state: IState) => {
    return {
        cart: state.cart
    }
};

export default connect(mapStateToProps)(CartScreen)

const styles = StyleSheet.create({
    noProductsContainer: {
        marginTop: 30,
        flex: 1,
        justifyContent: "center"
    },
    container: {
        marginTop: 30,
    },
    title: {
        color: Colors.black,
        fontFamily: 'montserrat-light',
        fontSize: 22,
        textAlign: 'center'
    },
    subtitle: {
        color: Colors.darkGray,
        fontFamily: 'montserrat-light',
        fontSize: 16,
        textAlign: 'center'
    },
    cartEmpty: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    }
});