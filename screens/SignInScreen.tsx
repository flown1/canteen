import React from 'react'
import {
    Image,
    Text,
    StyleSheet,
    View, TouchableOpacity
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
import CanteenApi from "../utils/CanteenApi";
import UserData from "../dataModels/UserData";
import Loader from "../components/Loader/Loader";

const googleSignInBtn = require("../assets/images/google_signin_btn.png");

class SignInScreen extends React.Component<ISignInScreenProps, ISignInScreenState> {
    state = {
        isLoading: false
    };

    render() {
        const loader = this.state.isLoading? <Loader/> : null;

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
                        <TouchableOpacity onPress={this._signIn}>
                            <Image style={styles.googleBtn} source={googleSignInBtn}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomBox}>
                    <Text style={styles.bottomLine}>Wszelkie prawa zastrzeżone &copy; Łodz 2018</Text>
                </View>
                {loader}
            </View>
        )
    }

    private _signIn = async (e: any) : Promise<any> => {
        e.preventDefault();
        this._showLoader();

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

                CanteenApi.postUser(googleAuthUser, (res) => {
                    if (res.status === "SUCCESS") {
                        const data = res.data;
                        const user = new UserData( data.name, data.email, data.imgUrl, data.role, data.token );

                        console.log( "SUCCESSFULLY signed in ", user );

                        this.props.onSuccessfulSignIn( user );
                        this._hideLoader();
                        this.props.navigation.dispatch( this._resetAction );

                    } else {
                        this._hideLoader();
                        console.error("POSTing user UNsuccessful!");
                    }
                });
            } else {
                console.error("Signin cancelled")
            }

        } catch (e) {
            console.error("Error while signingIn: ", e)
            this._hideLoader();

        }
    };

    private _showLoader = () : void => {
      this.setState({isLoading: true});
    };

    private _hideLoader = () : void => {
        this.setState({isLoading: false});
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
        marginTop: 20
    },
    bottomBox: {
        bottom: 5,
        alignItems: 'stretch'
    },
    bottomLine: {
        fontSize: 13,
        fontFamily: 'montserrat-light',
        textAlign: 'center'
    },
    loader: {
        position: 'absolute',
        backgroundColor:  'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    }
});