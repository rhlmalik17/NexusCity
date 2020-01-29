import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator , Button, BackHandler } from "react-native";
import * as firebase from "firebase";
import { StackActions, NavigationActions } from 'react-navigation';
import firebaseConfig from "../config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export class DashBoard extends Component {
  constructor() {
    super();
    this.state={
      username: ''
    }
   
  }
  componentWillMount()
  {
    BackHandler.addEventListener('hardwareBackPress', function(){
      return true;
    })
  }
  async signOut()
  {
    firebase.auth().signOut().then( async () => {
        // Sign-out successful.
        await alert('User has been logged out!');
        // this.props.navigation.push('LoginScreen');
        // this.props.navigation.push('SignUpScreen');
        // this.props.navigation.push('EmailVerification');
        // this.props.navigation.push('DashBoard');
        // this.props.navigation.push('MainScreen');
        this.props.navigation.navigate('MainScreen');
      }).catch(function(error) {
        // An error happened.
      });
  }
  async componentDidMount() {
    let query = firebase.database().ref("usernames");
    query.once("value")
    .then((snapshot)=>{
      var uname=snapshot.child(firebase.auth().currentUser.uid+"/username");
      this.setState({ username: uname.val()});
    })
    
  }
  render() {
     if(this.state.username)
     {
      return (
        <View style={styles.container}>
          <Text>Hello, {this.state.username}</Text>
          <Button title="Sign Out" onPress={()=> this.signOut()}/>
        </View>
      );
     }
        else
        {
         
          return <ActivityIndicator size="large"/>
     
        }
      }
  }


export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
