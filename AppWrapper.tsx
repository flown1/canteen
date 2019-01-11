import React from 'react';
import { AppNavigator } from "./navigation/AppNavigator";
import { Notifications, Permissions } from "expo";
import { withInAppNotification } from 'react-native-in-app-notification';
import { Platform }from 'react-native';

interface IAppWrapperProps {
    showNotification: ({}) => void
}

class AppWrapper extends React.Component<IAppWrapperProps, {}> {

    private _notificationSubscription;

    constructor(props) {
        super(props);
        this._notificationSubscription = null;

        this.state = {
            notification: {}
        };
    }

    componentDidMount(): void {
        this._configApp();
    }

    render() {
        return (
            <>
                <AppNavigator/>
            </>
        );
    }

    private _handleNotification = (notification: {}) : any => {
        this.setState({notification: notification});

        if (Platform.OS === 'ios') {
            this.props.showNotification({
                title: '🥗 Twoje zamówienie jest gotowe! 🥗',
                message: 'Do odbioru użyj kodu z zakładki "Zamówienia"'
            });
        }
    };

    private _registerForPushNotificationsAsync = async ()  => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log("Notifications permission NOT granted");
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        console.log("Push Token is:", token);

        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        // CanteenApi.sendExponentPushToken(token, (res) => {
        //     console.log("RES from sendingExponentPushToken: ",res);
        //
        //     if (res.status === "SUCCESS") {
        //     }
        // })
    };

    private _configApp = () => {
        this._registerForPushNotificationsAsync();
    };
}

export default withInAppNotification(AppWrapper);
