import MainScreen from './Screens/MainScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LogIn from './Screens/LogIn';
import SignUp from './Screens/SignUp';
import DashBoardScreen from './Screens/DashBoard'
import * as firebase from 'firebase';
import firebaseConfig from './config';
import { StackActions, NavigationActions } from 'react-navigation';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

MainScreen.navigationOptions={
  header: null,
}

LogIn.navigationOptions={
  header: null
}

SignUp.navigationOptions={
  header: null
}
DashBoardScreen.navigationOptions={
  header: null
}

const AppContainer = createStackNavigator(
  {
    MainScreen: MainScreen,
    LoginScreen: LogIn,
    SignUpScreen: SignUp,
    DashBoardScreen: DashBoardScreen
  },
  {
    initialRouteName: 'MainScreen',
  }
);

export default createAppContainer(AppContainer);