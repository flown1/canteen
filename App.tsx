import React from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import IError from "./@types/models/errors/IError";
import IAppState from "./@types/IAppState";
import IAppProps from "./@types/IAppProps";
import {createStackNavigator} from "react-navigation";
import SignInScreen from "./screens/SignInScreen";
import MenuScreen from "./screens/MenuScreen";

export default class App extends React.Component<IAppProps, IAppState> {
    state = {
        isLoadingComplete: false
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <AppStackNavigator/>
            )
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
                'scriptmt-bold': require('./assets/fonts/ScriptMTBold.ttf'),

            }),
        ]);
    };

    private _handleLoadingError = (error: IError) : void => {
        console.warn(error);
    };

    private _handleFinishLoading = () : void => {
        this.setState({ isLoadingComplete: true });
    };
}
const AppStackNavigator = createStackNavigator({
    SignIn: {
        screen: SignInScreen,
        navigationOptions: {
            header: null
        }
    },
    Menu: {
        screen: MenuScreen,
        navigationOptions: {
            headerLeft: null
        }
    }
});