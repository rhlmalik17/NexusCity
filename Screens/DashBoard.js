import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator , Button } from "react-native";
import * as firebase from "firebase";
import firebaseConfig from "../config";

export class DashBoard extends Component {
  constructor() {
    super();
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    try{
        this.email=firebase.auth().currentUser.email;
    }catch(error)
    {

    }
  }
  async signOut()
  {
    firebase.auth().signOut().then( async () => {
        // Sign-out successful.
        await alert('User has been logged out!');
        this.email=null;
        this.props.navigation.navigate('MainScreen');
      }).catch(function(error) {
        // An error happened.
      });
  }
  render() {
      if(this.email)
      {
        return (
            <View style={styles.container}>
              <Text>Hello, {this.email}</Text>
              <Button title="Sign Out" onPress={()=> this.signOut()}/>
            </View>
          );
      }
    else
    {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
  }
}

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*Hello*/
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
