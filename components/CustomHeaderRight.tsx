import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Logo from "./Text/Logo";
import Colors from "../constants/Colors";
import IReactNavigateProps from "../@types/@react-navigation/IReactNavigateProps";
import {IState} from "../@types/redux/state/IState";
import { connect } from 'react-redux';
import {USER_ROLES} from "../constants/UserRoles";
import UserData from "../dataModels/UserData";

const loopIco = require('../assets/images/search_ico.png');
const cartIco = require('../assets/images/cart_ico.png');

interface ICustomHeaderProps {
    navigation: IReactNavigateProps,
    cartLength: number,
    user: UserData
}

class CustomHeaderRight extends React.Component<ICustomHeaderProps> {
    render() {
        const basketIcon =  this.props.user && this.props.user.role === USER_ROLES.CLIENT?
            <TouchableOpacity onPress={this._handleCartIcoClick}>
                <View style={styles.cartWrapper}>
                <Image source={cartIco} style={styles.cartIco}/>
                    <View style={styles.cartNumberWrapper}>
                        <Text style={styles.cartNumber}>{this.props.cartLength}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            : null;

        const header = this.props.user?
            <View style={styles.container}>
                <View/>
                <View style={styles.logoWrapper}>
                    <Logo size={"medium"}/>
                </View>
                {basketIcon}
                <TouchableOpacity onPress={this._handleSearchIcoClick}>
                    {/*<Image source={loopIco} style={styles.loopIco}/>*/}
                </TouchableOpacity>
            </View>
            :
            null
        ;

        return (
            <>
                {header}
            </>
        );
    };

    private _handleSearchIcoClick = (): void => {

    };

    private _handleCartIcoClick = (): void => {
        this.props.navigation.navigate('Cart');
    };
}

const mapStateToProps = (state: IState) => {
    return {
        cartLength: state.cart.items.length,
        user: state.signIn.user
    }
};

export default connect(mapStateToProps)(CustomHeaderRight);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginLeft: 8,
        marginRight: 8,
        paddingBottom: 5,
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,

        //shadow
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    },
    logoWrapper: {
        justifyContent: 'center'
    },
    loopIco: {
        height: 30,
        width: 30,
        marginTop: 16
    },
    cartWrapper: {
        flex: 1
    },
    cartNumberWrapper: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: Colors.crimson,
        top: 10,
        left: 20,
        position: 'absolute'
    },
    cartIco: {
        height: 30,
        width: 35,
        top: 20,
        position: 'absolute',

    },
    cartNumber: {
        color: Colors.boneWhite,
        height: 20,
        width: 20,
        textAlign: 'center'
    }
});