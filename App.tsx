import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import IError from "./@types/errors/IError";
import IAppState from "./@types/states/IAppState";
import IAppProps from "./@types/props/IAppProps";
import {createStackNavigator} from "react-navigation";
import SignInScreen from "./screens/SignInScreen";
import MenuScreen from "./screens/MenuScreen";

export default class App extends React.Component<IAppProps, IAppState> {
    state = {
        isLoadingComplete: false
    };

    render() {
        return (
            <AppStackNavigator />
        )
    }

    private _loadResourcesAsync = async () : Promise<any> => {
        return Promise.all([
            Asset.loadAsync([
                /****** async loading stuff here ******/
                // require('./assets/images/robot-dev.png'),
                // require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                // ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.tsx. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
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
        screen: SignInScreen
    },
    Menu: {
        screen: MenuScreen
    }
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});