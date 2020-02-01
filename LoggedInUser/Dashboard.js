import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator , Button, BackHandler } from "react-native";
import * as firebase from "firebase";
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
function Settings()
{
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
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
    Messages: Messages,
    Settings: Settings,
    Friends: Friends,
  },
  { 
    initialRouteName: 'Messages',
    backgroundColor: '#000'
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
