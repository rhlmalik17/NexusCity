import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator , Button } from "react-native";
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
      email: ''
    }
   
  }
  async signOut()
  {
    firebase.auth().signOut().then( async () => {
        // Sign-out successful.
        await alert('User has been logged out!');
        this.email=null;
        this.props.navigation.push('MainScreen');
        this.props.navigation.push('LoginScreen');
        this.props.navigation.push('SignUpScreen');
        this.props.navigation.push('EmailVerification');
        this.props.navigation.push('DashBoard');
        this.props.navigation.navigate('MainScreen');
      }).catch(function(error) {
        // An error happened.
      });
  }
  async componentDidMount() {
    let user=firebase.auth().currentUser;
    this.setState({ email: user.email })
  }
  render() {
     if(this.state.email)
     {
      return (
        <View style={styles.container}>
          <Text>Hello, {this.state.email}</Text>
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
