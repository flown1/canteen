import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import SignInScreen from "../screens/SignInScreen";
import MainTabNavigator from "./MainTabNavigator";

export default createSwitchNavigator({
   BottomNav: MainTabNavigator
});