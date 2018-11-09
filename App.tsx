import React from 'react';
import { AppLoading, Font, Icon } from 'expo';
import IError from "./@types/components/errors/IError";
import IAppState from "./@types/IAppState";
import IAppProps from "./@types/IAppProps";
import {AppNavigator} from "./navigation/AppNavigator";

export default class App extends React.Component<IAppProps, IAppState> {
    state = {
        isLoadingComplete: false,
        isSignedIn: false
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
                 <AppNavigator/>
            )
        }
    }

    private _loadResourcesAsync = async () => {
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
        this.setState({ isLoadingComplete: true, isSignedIn: true });
    };
}