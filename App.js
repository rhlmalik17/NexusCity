import MainScreen from './Screens/MainScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LogIn from './Screens/LogIn';
import SignUp from './Screens/SignUp';
import EmailVerification from './Screens/EmailVerification'
import * as firebase from 'firebase';
import firebaseConfig from './config';
import DashBoard from './LoggedInUser/Dashboard'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

DashBoard.navigationOptions={
  headerLeft: null,
  header: null
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

EmailVerification.navigationOptions={
  header: null
}

const AppContainer = createStackNavigator(
  {
    MainScreen: MainScreen,
    LoginScreen: LogIn,
    SignUpScreen: SignUp,
    EmailVerification: EmailVerification,
    DashBoard: DashBoard
  },
  {
    initialRouteName: 'MainScreen',
  }
);

export default createAppContainer(AppContainer);