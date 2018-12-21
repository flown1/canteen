import React from 'react'
import {
    Image,
    Text,
    StyleSheet,
    View, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import API_KEYS from '../constants/ApiKeys'
import Expo from "expo"
import ISignInScreenState from "../@types/screens/SignInScreen/ISignInScreenState";
import ISignInScreenProps from "../@types/screens/SignInScreen/ISignInScreenProps";
import {NavigationActions, StackActions} from "react-navigation";
import TextStruck from "../components/Text/TextStruck";
import Logo from "../components/Text/Logo";
import Colors from "../constants/Colors";
import signInSuccesful from "../redux/actions/signInAction";
import GoogleAuthUser from "../dataModels/GoogleAuthUser";
import ApiFetcher from "../utils/ApiFetcher";
import UserData from "../dataModels/UserData";

const googleSignInBtn = require("../assets/images/google_signin_btn.png");

class SignInScreen extends React.Component<ISignInScreenProps, ISignInScreenState> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainBox}>
                    <View style={styles.logoBox}>
                        <Logo size={"large"}/>
                        <TextStruck textStyle={styles.logoSubtitle} text={"Est. 2018"} lineStyle={styles.logoSubtitleLine} containerStyles={styles.struckLineContainer}/>
                    </View>
                    <TextStruck text="Zaloguj się"
                                textStyle={styles.signInText}
                                lineStyle={styles.line}
                                containerStyles={styles.struckLineContainer}/>
                    <View style={styles.signInBtnWrapper}>
                        <TouchableHighlight onPress={this._signIn}>
                            <Image style={styles.googleBtn} source={googleSignInBtn}/>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.bottomBox}>
                    <Text style={styles.bottomLine}>Made in Lodz 2018</Text>
                </View>
            </View>
        )
    }

    private _signIn = async (e: any) : Promise<any> => {
        e.preventDefault();

        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: API_KEYS.GOOGLE_AUTH_ANDROID,
                iosClientId: API_KEYS.GOOGLE_AUTH_IOS,
                scopes: ["profile", "email"]
            });

            if (result.type === "success") {

                const googleAuthUser = new GoogleAuthUser(result.user.name,
                                        result.user.email,
                                        result.user.photoUrl,
                                        result.serverAuthCode);

                ApiFetcher.postUser(googleAuthUser, (res) => {
                    if (res.status === "SUCCESS") {
                        const data = res.data;
                        const user = new UserData( data.name, data.email, data.imgUrl, data.role, data.token );

                        console.log( "SUCCESSFULLY signed in ", user );

                        this.props.onSuccessfulSignIn( user );
                        this.props.navigation.dispatch( this._resetAction );
                    } else {
                        console.error("POSTing user UNsuccessful!");
                    }
                });
            } else {
                console.error("Signin cancelled")
            }

        } catch (e) {
            console.error("Error while signingIn: ", e)
        }
    };

    private _resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: 'Menu'})
        ]
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSuccessfulSignIn: (user) => {
            dispatch(signInSuccesful(user))
        }
    }
};

export default connect(state => state, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        justifyContent: 'space-between',
    },
    mainBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    logoBox: {
        top: -100
    },
    logoSubtitle: {
        color: Colors.black,
        fontFamily: 'montserrat-light',
        fontSize: 16,
        textAlign: 'center'
    },
    logoSubtitleLine: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        width: 80,
        top: -10
    },
    signInText: {
        color: Colors.black,
        fontFamily: 'montserrat-light',
        fontSize: 24,
        textAlign: 'center'
    },
    struckLineContainer: {
        width: 200
    },
    line: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        width: 80,
        top: -12
    },
    signInBtnWrapper: {
        alignItems: 'center'
    },
    googleBtn: {
    },
    bottomBox: {
        bottom: 5,
        alignItems: 'stretch'
    },
    bottomLine: {
        fontSize: 13,
        fontFamily: 'montserrat-light',
        textAlign: 'center'
    }
});