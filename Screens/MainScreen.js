import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableNativeFeedback,
  } from "react-native";
  import * as Font from "expo-font";
  import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
export default class MainScreen extends React.Component {

  async componentDidMount() {
    await Font.loadAsync({
      'NicotineRegular' : require("../Fonts/Nicotine-Regular.ttf"),
      'Open-Sans' : require("../Fonts/OpenSans-Regular.ttf")
    });
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/Background.png")}
        style={styles.container}
      >
        <View nativeID="FlexBOX" style={styles.ParentBox}>
        <Image source={require('../assets/Logo.png')} style={styles.Logo}/>
          <View style={styles.logoBox}>
            {/* LOGO */}
            <View style={styles.Icons}>
            <Icon name="building" color="#FFF" size={50} style={{top: 10}}/>
            <Icon name="building" color="#FFF" size={60} />
            <Icon name="building" color="#FFF" size={40} style={{top: 20}} />
            </View>
            <Text style={styles.TextStylings}>NexusCity</Text>
          </View>
          <View style={styles.buttonBox}>
            {/* BUTTONS */}
            {/* LOGIN */}

            <TouchableNativeFeedback onPress={()=>this.props.navigation.navigate('LoginScreen')} >
              <View style={styles.LoginButton}>
                <Text style={{ fontSize: 25, color: "#FFF" , fontFamily: 'Open-Sans' }}>LOGIN</Text>
              </View>
            </TouchableNativeFeedback>
            <View
              style={{
                borderRadius: 20,
                height: 10,
                width: 200,
                backgroundColor: "rgba(255,255,255,0.8)"
              }}
            ></View>
           <TouchableNativeFeedback onPress={()=>this.props.navigation.navigate('SignUpScreen')}>
            <View style={{...styles.LoginButton, backgroundColor:'rgba(219, 219, 219, 0.5)'}}>
              <Text style={{ fontSize: 25, color: "#FFF" , fontFamily: 'Open-Sans'}}>SIGN UP</Text>
              </View>
              </TouchableNativeFeedback>
          </View>
          <View style={styles.apiBox}>{/* API BUTTONS */}
            <Icon 
                name="facebook"
                color="#FFF"
                size={50}
               />
               <Icon 
                name="twitter"
                color="#FFF"
                size={50}
               />
              <Icon 
                name="google"
                color="#FFF"
                size={50}
               />
          </View>
        </View>
      </ImageBackground>
    );
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
  ParentBox: {
    flex: 0.9,
    justifyContent: "space-around",
    alignItems: "center"
  },
  logoBox: {
    top: 20,
    width: 280,
    height: 280,
    backgroundColor: "rgba(0, 175, 181, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 150,
  },
  buttonBox: {
    width: 400,
    height: 180,
    alignItems: "center",
    justifyContent: "space-between",
    top: 40
  },
  apiBox: {
    width: 350,
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 20
  },
  TextStylings: {
    color: "#FFF",
    fontSize: 50,
    fontFamily: "NicotineRegular",
    rotation: -8
  },
  LoginButton: {
    backgroundColor: "rgba(0, 175, 181, 1)",
    height: 60,
    width: 400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30
  },
  Logo:{
    height: 500,
    width: 500,
    position: 'absolute',
    top: -45,
    left: -20,
    zIndex: 1
  },
  Icons: {
    marginBottom: 25,
    flexDirection: 'row',
  }
});
