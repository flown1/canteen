import React from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native';
import API_KEYS from '../constants/Api_keys'
import Expo from "expo"
import ISignInScreenState from "../@types/states/screens/ISignInScreenState";

class SignInScreen extends React.Component<{}, ISignInScreenState> {

    state = {
        signedIn: false
    };

    componentWillMount(){

    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.mainBox}>
                    <Text style={styles.signInText}>Logowanie</Text>
                    <Button title={"Google Sign In"} onPress={this._signIn}
                            style={styles.signInButton}>Google Sign In</Button>
                </View>
            </View>
        )
    }

    private _signIn = async (e: any) : void => {
        e.preventDefault();
        console.log("Signing in...");

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
                })
                this.props.navigation.navigate('Menu');
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }
}
export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    mainBox: {
        backgroundColor: 'red',
        marginLeft: 15,
        marginRight: 15
    },
    signInText: {
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        textAlign: 'center'
    },
    signInButton: {
        height: 20,
        width:40,
        backgroundColor: 'blue'
    }
});