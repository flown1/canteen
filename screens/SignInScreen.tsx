import React from 'react'
import {
    Image,
    Text,
    StyleSheet,
    View, TouchableHighlight
} from 'react-native';
import API_KEYS from '../constants/Api_keys'
import Expo from "expo"
import ISignInScreenState from "../@types/screens/SignInScreen/ISignInScreenState";
import ISignInScreenProps from "../@types/screens/SignInScreen/ISignInScreenProps";
import {NavigationActions, StackActions} from "react-navigation";
import TextStruck from "../components/uiUtils/TextStruck";
import Logo from "../components/uiUtils/Logo";
import Colors from "../constants/Colors";

const googleSignInBtn = require("../assets/images/google_signin_btn.png");

class SignInScreen extends React.Component<ISignInScreenProps, ISignInScreenState> {

    state = {
        signedIn: false,
        isSigninInProgress: false
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainBox}>
                    <View style={styles.logoBox}>
                        <Logo/>
                        <TextStruck textStyle={styles.logoSubtitle} text={"Est. 2018"} lineStyle={styles.logoSubtitleLine} containerStyles={styles.struckLineContainer}/>
                    </View>
                    <TextStruck text="Zaloguj się"
                                textStyle={styles.signInText}
                                lineStyle={styles.line}
                                containerStyles={styles.struckLineContainer}/>
                    <TouchableHighlight onPress={this._signIn}>
                        <Image style={styles.googleBtn} source={googleSignInBtn}/>
                    </TouchableHighlight>
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
                console.log(result.user.name);
                this.setState({
                    signedIn: true
                });
                this.props.navigation.dispatch(this._resetAction);
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    };

    private _resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({routeName: 'Menu'}),
        ],
    });
}
export default SignInScreen;

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