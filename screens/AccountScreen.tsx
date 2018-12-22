import React from 'react';
import {Image, StyleSheet, View, Text, Button} from "react-native";
import { connect } from 'react-redux';
import {IAccountScreenProps} from "../@types/screens/AccountScreen/IAccountProps";
import Colors from "../constants/Colors";
import {IState} from "../@types/redux/state/IState";
import {USER_ROLES} from "../constants/UserRoles";
import Fonts from "../constants/Fonts";


class AccountScreen extends React.Component<IAccountScreenProps, {}> {

    render() {
        const adminLabel = this.props.signIn.user.role === USER_ROLES.ADMIN ?
            <Text style={styles.adminLabel}>{this.props.signIn.user.role}</Text>
            : null;

        return (
            <View style={styles.container}>
                <View style={styles.profileBox}>
                    <Image style={styles.photo} source={{uri: this.props.signIn.user.imgUrl}}/>
                    <Text style={styles.name}>{this.props.signIn.user.name}</Text>
                    <Text style={styles.email}>{this.props.signIn.user.email}</Text>
                    {adminLabel}
                </View>
                <Button onPress={this._handleLogoutPress} title={"Wyloguj"}/>
            </View>
        );
    }

    private _handleLogoutPress = () : void => {
        console.log("Signing out...")
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.boneWhite,

        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10

    },
    profileBox: {
        alignItems: 'center'
    },
    photo: {
        height: 100,
        width: 100,
        backgroundColor: Colors.gray,
        borderRadius: 50
    },
    name: {
        fontSize: 22,
        color: Colors.black,
        fontFamily: Fonts.family.montserrat_light
    },
    email: {
        fontSize: 18,
        color: Colors.black,
    },
    adminLabel: {
        color: Colors.crimson,
        fontFamily: Fonts.family.montserrat_light
    }
});

const mapStateToProps = (state: IState) => {
    return {
        signIn: state.signIn
    }
};
export default connect(mapStateToProps, null)(AccountScreen);