import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import * as Font from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import * as firebase from 'firebase';
import firebaseConfig from '../config';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { StackActions, NavigationActions } from 'react-navigation';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class MainScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      willLoad: false,
    };
    firebase.auth().onAuthStateChanged(function(user){
      if(user)
      {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'DashBoardScreen' })]
        });
        this.props.navigation.dispatch(resetAction);
      }
      else
      {
        this.setState({willLoad: true})
      }
    }.bind(this));
   
  }
  async componentDidMount() {
    await Font.loadAsync({
      NicotineRegular: require("../Fonts/Nicotine-Regular.ttf"),
      "Open-Sans": require("../Fonts/OpenSans-Regular.ttf")
    });
    await this.setState({ fontsLoaded: true });
  }
  
  render() {
    if(this.state.willLoad)
    {
      if (!this.state.fontsLoaded) {
        return <ActivityIndicator size="large" />;
      } else {
        return (
          <ImageBackground
            source={require("../assets/Background.png")}
            style={styles.container}
          >
          <StatusBar  
     backgroundColor = "#b3e6ff"  
     barStyle = "dark-content"   
     hidden={true}
   />  
            <View nativeID="FlexBOX" style={styles.ParentBox}>
            <View style={styles.logoParent}>
            <Image source={require("../assets/Logo.png")} style={styles.Logo} />
              <View style={styles.logoBox}>
                {/* LOGO */}
                <View style={styles.Icons}>
                  <Icon
                    name="location-arrow"
                    color="#FFF"
                    size={RFPercentage(8)}
                  />
                </View>
                <Text style={styles.TextStylings}>NexusCity</Text>
              </View>
            </View>
              
              <View style={styles.buttonBox}>
                {/* BUTTONS */}
                {/* LOGIN */}
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate("LoginScreen")}
                  background={TouchableNativeFeedback.Ripple("", false)}
                >
                  <View style={styles.LoginButton}>
                    <Text
                      style={{
                        fontSize: RFPercentage(3),
                        color: "#FFF",
                        fontFamily: "Open-Sans"
                      }}
                    >
                      LOGIN
                    </Text>
                  </View>
                  </TouchableNativeFeedback>
                 
                

                <View
                  style={{
                    borderRadius: 20,
                    height: '5%',
                    width: '45%',
                    backgroundColor: "rgba(255,255,255,0.8)"
                  }}
                ></View>
                
                <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate("SignUpScreen")}
                  background={TouchableNativeFeedback.Ripple("", false)}
                >
                  <View
                    style={{
                      ...styles.LoginButton,
                      backgroundColor: "rgba(219, 219, 219, 0.5)"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: RFPercentage(3),
                        color: "#FFF",
                        fontFamily: "Open-Sans"
                      }}
                    >
                      SIGN UP
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={styles.apiBox}>
                {/* API BUTTONS */}
                <TouchableOpacity>
                  <Icon name="facebook" color="#FFF" size={RFPercentage(5)} />
                </TouchableOpacity>
  
                <TouchableOpacity>
                  <Icon
                    name="google"
                    color="#FFF"
                    size={RFPercentage(5)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        );
    }
    
    }
    else
    {
      return (
        <View style={{ flex:1,alignItems: 'center', justifyContent: 'center' }}>
          <Text>Hello</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#00FFFF"
  },
  ParentBox:{
    height: '100%',
    justifyContent: "space-around",
    alignItems: "center",

  },
  logoBox: {
    width: RFPercentage(35),
    height: RFPercentage(35),
    backgroundColor: "rgba(0, 175, 181, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFPercentage(50),
    
  },
  logoParent:{
    width: RFPercentage(35),
    height: RFPercentage(35),
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonBox: {
    height: '20%',
    width: '100%',
    alignItems: "center",
    justifyContent: "space-between",
  },
  apiBox: {
    width: '65%',
    height: '10%',
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    top: 20
  },
  TextStylings: {
    color: "#FFF",
    fontSize: RFPercentage(6),
    fontFamily: "NicotineRegular",
    transform: [{ rotate: "-8deg" }]
  },
  LoginButton: {
    backgroundColor: "rgba(0, 175, 181, 1)",
    height: '35%',
    width: '86%',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  Logo: {
    height: RFPercentage(60),
    width: RFPercentage(60),
    position: "absolute",
    zIndex: 1,
    top: RFPercentage(-12)
  },
  Icons: {
    marginBottom: 25,
    flexDirection: "row"
  }
});
