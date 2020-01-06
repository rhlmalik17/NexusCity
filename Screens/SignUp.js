import React, { Component } from "react";
import { Text, View, TouchableNativeFeedback, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { signUpAndCreateUser } from '../Credentials/ManageUsers';


export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      borderWidth: 2,
      focus: false,
      focus2: false,
      focus3: false,
      focus4: false,
      isHidden: true,
      fontsLoaded: false,
      Full_Name: '',
      email: '',
      username: '',
      password: '',
    };
  }
  bundleDataAndSend(){
    if((this.state.Full_Name) && 
    (this.state.email) && 
    (this.state.username) && 
    (this.state.password))
    {
      signUpAndCreateUser(this.state.Full_Name,this.state.email,this.state.username,this.state.password,this);
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      KulimPark: require("../Fonts/KulimPark-Regular.ttf")
    });
    await this.setState({ fontsLoaded: true });
  }
  render() {
    if(!this.state.fontsLoaded)
    {
      return <ActivityIndicator size="large"/>
    }
    else {
    return (
      <View style={styles.container}>
        <View style={styles.ParentBox}>
          <View style={styles.Heading}>
            <Text style={styles.TextStylings}>Sign Up</Text>
          </View>
          <View style={styles.InputParent}>
            <View>
              <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                Full Name
              </Text>

              <TextInput
                onFocus={() => this.setState({ focus: true })}
                onBlur={() => this.setState({ focus: false })}
                style={{
                  ...styles.Inputs,
                  borderWidth: this.state.focus ? this.state.borderWidth : 0,
                  backgroundColor: this.state.focus
                    ? "#FFF"
                    : "rgba(211, 219, 219,0.5)"
                }}
                value={this.state.Full_Name}
                onChangeText={(text)=> this.setState({ Full_Name: text })}
              />
              
            </View>
            <View>
              <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                Email
              </Text>

              <TextInput
                onFocus={() => this.setState({ focus2: true })}
                onBlur={() => this.setState({ focus2: false })}
                style={{
                  ...styles.Inputs,
                  borderWidth: this.state.focus2 ? this.state.borderWidth : 0,
                  backgroundColor: this.state.focus2
                    ? "#FFF"
                    : "rgba(211, 219, 219,0.5)"
                }}
                value={this.state.email}
                onChangeText={(text)=> this.setState({ email: text })}
                autoCapitalize = 'none'
              />
            </View>
            <View>
              <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                Username
              </Text>

              <TextInput
                onFocus={() => this.setState({ focus3: true })}
                onBlur={() => this.setState({ focus3: false })}
                style={{
                  ...styles.Inputs,
                  borderWidth: this.state.focus3 ? this.state.borderWidth : 0,
                  backgroundColor: this.state.focus3
                    ? "#FFF"
                    : "rgba(211, 219, 219,0.5)"
                }}
                value={this.state.username}
                onChangeText={(text)=> this.setState({ username: text })}
                autoCapitalize = 'none'
              />
            </View>
            <View>
              <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                Password
              </Text>
              <View>
                <View
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    left: 360,
                    top: 15,
                    height: 40,
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.state.isHidden
                        ? this.setState({ isHidden: false })
                        : this.setState({ isHidden: true });
                    }}
                  >
                    <Icon
                      name={this.state.isHidden ? "eye" : "eye-slash"}
                      size={25}
                      color={"#313332"}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  onFocus={() => this.setState({ focus4: true })}
                  onBlur={() => this.setState({ focus4: false })}
                  style={{
                    ...styles.Inputs,
                    borderWidth: this.state.focus4 ? this.state.borderWidth : 0,
                    backgroundColor: this.state.focus4
                      ? "#FFF"
                      : "rgba(211, 219, 219,0.5)"
                  }}
                  secureTextEntry={this.state.isHidden ? true : false}
                value={this.state.password}
                onChangeText={(text)=> this.setState({ password: text })}
                autoCapitalize = 'none'
                />
              </View>
            </View>
          </View>
          <View style={styles.ButtonBox}>
            <View>
              <Text style={{ ...styles.TextStylings, fontSize: 12, margin: 5 }}>
                By clicking Sign Up, you are indicating that you have read and
                acknowledge the
                <Text> </Text>
                <Text
                  style={{ color: "#12b0b5", textDecorationLine: "underline" }}
                >
                  Terms of Service
                </Text>{" "}
                and
                <Text> </Text>
                <Text
                  style={{ color: "#12b0b5", textDecorationLine: "underline" }}
                >
                  Privacy Notice.
                </Text>
              </Text>
            </View>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple()}
              onPress={()=>this.bundleDataAndSend()}
            >
              <View style={ ((this.state.Full_Name) && 
                             (this.state.email) && 
                             (this.state.username) && 
                             (this.state.password)) ?  
                             styles.Buttons : styles.DisableButton}>
                <Text
                  style={{
                    ...styles.TextStylings,
                    fontSize: 15,
                    color: "white"
                  }}
                >
                  Sign Up
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("LoginScreen")}
            >
              <Text
                style={{
                  ...styles.TextStylings,
                  fontSize: 15,
                  marginTop: 25,
                  color: "#12b0b5",
                  alignSelf: "center"
                }}
              >
                Already a User? Log In Here!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
              }
  }
}

export default SignUp;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch"
  },
  Heading: {
    alignItems: "center"
  },
  InputParent: {
    height: 350,
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  Buttons: {
    height: 30,
    backgroundColor: "#16dae0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 5,
    top: 10
  },
  ParentBox: {
    top: 50,
    height: 300,
    margin: 20,
    justifyContent: "space-between"
  },
  TextStylings: {
    fontSize: 25,
    color: "#141413",
    fontFamily: "KulimPark"
  },
  Inputs: {
    top: 10,
    height: 50,
    borderColor: "#72e8ed",
    marginRight: 20,
    borderRadius: 10,
    paddingLeft: 20,
    fontFamily: "KulimPark"
  },
  ButtonBox: {
    height: 150,
    marginRight: 20,
    alignItems: "stretch",
    top: 40
  },
  DisableButton: {
    height: 30,
    backgroundColor: "rgba(211, 219, 219,0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 5,
    top: 10
  }
};
