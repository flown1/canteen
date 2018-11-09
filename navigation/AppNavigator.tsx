import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator, createDrawerNavigator, createStackNavigator} from "react-navigation";
import MenuScreen from "../screens/MenuScreen";
import AccountScreen from "../screens/AccountScreen";
import SignInScreen from "../screens/SignInScreen";
import ArchiveScreen from "../screens/ArchiveScreen";
import OrderScreen from "../screens/OrderScreen";

import * as React from "react";
import Colors from "../constants/Colors";
import CustomHeader from "../components/CustomHeader";

const MenuIco = require('../assets/images/menu_ico_black_new.png');
const OrderIco = require('../assets/images/fastfood_ico_black.png');
const ArchiveIco = require('../assets/images/time_ico_black_new.png');
const AccountIco = require('../assets/images/profile_ico_black.png');

const styles = StyleSheet.create({
   ico: {
       width: 30,
       height: 30
   }
});

const BottomTabNavigator = createBottomTabNavigator(
    {
        Menu: {
            screen: MenuScreen,
            navigationOptions: () => ({
                tabBarLabel: 'Menu',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={MenuIco}
                        style={[styles.ico, {tintColor: tintColor}]}
                    />
                ),
                tabBarOptions: { activeTintColor: Colors.primary }
            })
        },
        Order: {
            screen: OrderScreen,
            navigationOptions: {
                tabBarLabel: 'Zamówienie',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={OrderIco}
                        style={[styles.ico, {tintColor: tintColor}]}
                    />
                ),
                tabBarOptions: { activeTintColor: Colors.primary }
            }
        },
        Archive: {
            screen: ArchiveScreen,
            navigationOptions: {
                tabBarLabel: 'Archiwum',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={ArchiveIco}
                        style={[styles.ico, {tintColor: tintColor}]}
                    />
                ),
                tabBarOptions: { activeTintColor: Colors.primary },
                
            }
        },
        Account: {
            screen: AccountScreen,
            navigationOptions: {
                tabBarLabel: 'Konto',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={AccountIco}
                        style={[styles.ico, {tintColor: tintColor}]}
                    />
                ),
                tabBarOptions: {
                    activeTintColor: Colors.primary
                }
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

    Menu: {
        screen: MainNavigator,
        navigationOptions: {
            header: <CustomHeader/>,
            headerLeft: null
        }
    },
    SignIn: {
        screen: SignInScreen,
        navigationOptions: {
            header: null
        }
    }
});