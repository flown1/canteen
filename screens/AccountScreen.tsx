import React from 'react';
import {Image, StyleSheet, View, Text, Button} from "react-native";
import { connect } from 'react-redux';
import {IAccountScreenProps} from "../@types/screens/AccountScreen/IAccountProps";
import Colors from "../constants/Colors";

class AccountScreen extends React.Component<IAccountScreenProps, {}> {

    render() {
        console.log(this.props.signInInfo.user.imgUrl);
        return (
            <View style={styles.container}>
                <View style={styles.profileBox}>
                    <Image style={styles.photo} source={{uri: this.props.signInInfo.user.imgUrl}}/>
                    <Text style={styles.name}>{this.props.signInInfo.user.firstName} {this.props.signInInfo.user.lastName}</Text>
                    <Text style={styles.email}>{this.props.signInInfo.user.email}</Text>
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
        fontFamily: 'montserrat-light'
    },
    email: {
        fontSize: 18,
        color: Colors.black,
    }
});

const mapStateToProps = (state) => {
    return {
        signInInfo: {
            isSignedIn: state.signIn.isSignedIn,
            user: state.signIn.user
        }
    }
};
export default connect(mapStateToProps, null)(AccountScreen);