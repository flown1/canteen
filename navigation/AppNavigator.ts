import {createBottomTabNavigator, createDrawerNavigator, createStackNavigator} from "react-navigation";
import MenuScreen from "../screens/MenuScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignInScreen from "../screens/SignInScreen";

const BottomTabNavigator = createBottomTabNavigator(
    {
        Menu: {
            screen: MenuScreen,
            navigationOptions: {
                header: null,
                headerLeft: null
            }
        },
        SettigsScreen: {
            screen: SettingsScreen,
            navigationOptions: {
                header: null,
                headerLeft: null
            }
        }
    },
    {
        animationEnabled: true
    }
);
const MainNavigator = createDrawerNavigator({
        Menu: {screen: BottomTabNavigator}
    }
);

export const AppNavigator = createStackNavigator({
    SignIn: {
        screen: SignInScreen,
        navigationOptions: {
            header: null
        }
    },
    Menu: {
        screen: MainNavigator,
        navigationOptions: {
            header: null,
            headerLeft: null
        }
    }
});