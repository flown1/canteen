import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';

const HomeStack = createStackNavigator({
  Home: SignInScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home'
};

export default createBottomTabNavigator({
  HomeStack,
});
