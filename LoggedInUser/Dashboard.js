import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator , Button, BackHandler, TabBarIOS } from "react-native";
import * as firebase from "firebase";
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import firebaseConfig from "../config";
import { createAppContainer } from 'react-navigation';

// export class DashBoard extends Component {
//   constructor() {
//     super();
//     this.state={
//       username: ''
//     }
//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }
//   }
//   componentWillMount()
//   {
//     BackHandler.addEventListener('hardwareBackPress', function(){
//       return true;
//     })
//   }
//   async signOut()
//   {
//     firebase.auth().signOut().then( async () => {
//         // Sign-out successful.
//         await alert('User has been logged out!');
//         this.props.navigation.navigate('MainScreen');
//       }).catch(function(error) {
//         // An error happened.
//       });
//   }
//   async componentDidMount() {
//     let query = firebase.database().ref("usernames");
//     query.once("value")
//     .then((snapshot)=>{
//       var uname=snapshot.child(firebase.auth().currentUser.uid+"/username");
//       this.setState({ username: uname.val()});
//     })
    
//   }
//   render() {
//      if(this.state.username)
//      {
//       return (
//         <View style={styles.container}>
//           <Text>Hello, {this.state.username}</Text>
//           <Button title="Sign Out" onPress={()=> this.signOut()}/>
//         </View>
//       );
//      }
//         else
//         {
//           return <ActivityIndicator size="large"/>
//         }
//       }
//   }
function Profile()
{
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  )
}
function Messages()
{
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  )
}
function Friends()
{
  return (
    <View style={styles.container}>
      <Text>Friends</Text>
    </View>
  )
}
const DashBoard = createAppContainer( createMaterialBottomTabNavigator(
  {
    Messages: { 
      screen: Messages,
      navigationOptions: {
        tabBarLabel: 'Messages',
        tabBarIcon: ({tintColor})=>(
          <Icon name="ios-quote" size={24} color={tintColor} />
        )
      } 
    },
    Friends: { screen: Friends,
      navigationOptions: {
        tabBarLabel: 'Friends',
        tabBarIcon: ({tintColor})=>(
          <Icon name="ios-people" size={24} color={tintColor} />
        )
      } 
    },
    Profile: { screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor})=>(
          <Icon name="ios-person" size={24} color={tintColor} />
        )
      } 
    },
  },
  { 
    initialRouteName: 'Messages',
    activeColor: '#000',
    barStyle: { backgroundColor: '#fff' },
    shifting: true,
    
  }
));

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
