import MainScreen from './Screens/MainScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LogIn from './Screens/LogIn';
import SignUp from './Screens/SignUp';


MainScreen.navigationOptions={
  header: null,
}

LogIn.navigationOptions={
  header: null
}

SignUp.navigationOptions={
  header: null
}

const AppContainer = createStackNavigator(
  {
    MainScreen: MainScreen,
    LoginScreen: LogIn,
    SignUpScreen: SignUp
  },
  {
    initialRouteName: 'MainScreen',
  }
);
export default createAppContainer(AppContainer);