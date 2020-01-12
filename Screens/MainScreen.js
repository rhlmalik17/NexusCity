import React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableNativeFeedback,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import * as Font from "expo-font";
import styles from '../Stylings/MainScreen_styles'
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity,} from "react-native-gesture-handler";
import * as firebase from 'firebase';
import firebaseConfig from '../config';
import { RFPercentage } from 'react-native-responsive-fontsize';
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
      if(user && firebase.auth().currentUser.emailVerified)
      {
        this.props.navigation.navigate('LoginScreen');
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
        <View>

        </View>
      );
    }
  }
}
