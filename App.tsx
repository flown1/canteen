import React from 'react';
import { AppLoading, Font } from 'expo';
import IError from "./@types/components/errors/IError";
import IAppState from "./@types/IAppState";
import IAppProps from "./@types/IAppProps";
import {AppNavigator} from "./navigation/AppNavigator";
import {createStore} from "redux";
import rootReducer from "./redux/reducers";
import { Provider } from 'react-redux'

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
            const store = createStore(rootReducer);
            return (
                <Provider store={store}>
                    <AppNavigator/>
                </Provider>
            )
        }
    }

    private _loadResourcesAsync = async () =>  {
        return Promise.all([
            Font.loadAsync({
                'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
                'scriptmt-bold': require('./assets/fonts/ScriptMTBold.ttf')
            }),
        ]);
    };

    private _handleLoadingError = (error: IError) : void => {
        console.error(error);
    };

    private _handleFinishLoading = () : void => {
        this.setState({ isLoadingComplete: true});
    };
}