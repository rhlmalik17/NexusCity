import React, { Component } from 'react'
import { Text, View , StyleSheet, ActivityIndicator} from 'react-native'
import * as firebase from 'firebase';
import firebaseConfig from '../config';
import * as Font from "expo-font";
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export class EmailVerification extends Component {

  constructor() {
    super();
    this.email='';
    this.state = {
      fontsLoaded: false,
      emailVerified: false
    };

  }
  async componentDidMount() {
    await Font.loadAsync({
      KulimPark: require("../Fonts/KulimPark-Regular.ttf"),
      KulimPark_Bold: require('../Fonts/KulimPark-Bold.ttf')
    });
    let user=firebase.auth().currentUser;
    this.email=user.email;
    this.setState({ fontsLoaded: true });
    this.sendEmailVerification();
  }
  sendEmailVerification()
  {
    let user=firebase.auth().currentUser;
    user.sendEmailVerification().catch((error)=>{

    });
  }
  render() {
    if(this.state.fontsLoaded)
    {
      return (
        <View style={styles.container}>
          <View style={styles.Parent}>
          <View style={styles.Heading}>
            <Text style={{...styles.TextStylings, fontSize: 20, fontWeight: 'normal'}}>Email Verification</Text>
          </View>
          <View style={styles.Message}>
            <Text style={{...styles.TextStylings, fontFamily: 'KulimPark_Bold',fontSize: 40,fontWeight: 'normal'}}>Please verify your NexusCity account.</Text>
          </View>
          <View style={styles.Description}>
           <Text style={{...styles.TextStylings, fontFamily: 'KulimPark_Bold',fontSize: 15, fontWeight: 'normal'}}>Click on the link sent to <Text style={{color: '#12b0b5'}}>{this.email}</Text> to verify your account.</Text>
           <Text style={{...styles.TextStylings, fontSize: 12, fontWeight: 'normal'}}>Verify your account to change your username, password and help keep your account secure.</Text>
          </View>
          <View style={styles.NavigateMessage}>
          {/* <Text>Verified: { (firebase.auth().currentUser.emailVerified) ? 'True' : 'False'}</Text> */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate("LoginScreen")}>
            <Text style={{fontFamily: 'KulimPark',color: '#12b0b5'}}> Email Verified? Click here to LogIn.</Text>
          </TouchableOpacity>
          </View>
          </View>
        </View>
      )
    }
    else
    {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
        
      )
    }
}
}

export default EmailVerification;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start'
    },Parent:{
      flex: 0.5,
      alignItems: 'stretch',
      justifyContent: 'space-around',
      margin: RFPercentage(4),
      marginTop: RFPercentage(2)
    },  
    Heading: {
      height: RFPercentage(5),
      alignItems: 'center',
      justifyContent: 'center'
    },
    Message:{
      top: RFPercentage(4)
    },
    Description :{
      height: RFPercentage(8),
      justifyContent: 'space-between'
    },
    NavigateMessage: {
      top: RFPercentage(-3),
      left: RFPercentage(-0.6)
    },
    TextStylings: {
      fontFamily: 'KulimPark',
      fontWeight: 'bold'
    }
  });