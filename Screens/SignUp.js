import React, { Component } from "react";
import {
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator
} from "react-native";
import * as Font from "expo-font";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styles from "../Stylings/SignUpScreen_styles";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import firebaseConfig from "../config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
      Full_Name: "",
      email: "",
      username: "",
      password: "",
    };
    this.flag=false;
  }
  bundleDataAndSend = () => {
    if (
      this.state.Full_Name &&
      this.state.email &&
      this.state.username &&
      this.state.password
    ) {
      this.checkIfUserNameExist(this.state.username);
      if (!this.flag) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
                firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
                  full_Name: this.state.Full_Name,
                  username: this.state.username,
                  email: this.state.email,
                  password: this.state.password,
                });
                this.setState({
                  Full_Name: "",
                  email: "",
                  username: "",
                  password: ""
                });
            this.props.navigation.navigate("EmailVerification");
          })
          .catch(
            function(error) {
              this.setState({
                Full_Name: "",
                email: "",
                username: "",
                password: ""
              });
              // if(!error==="undefined is not an object (evaluating 'props.navigation.navigate')")
              // alert(error+'\n Please try Again.');
              alert(error+"Error");
            }.bind(this)
          );
      } else {
        alert("User Already Exist");
      }
    }
  };

  checkIfUserNameExist= async (username)=> {
    var query =  firebase
      .database()
      .ref("users")
      .orderByKey();
     await query.once("value").then((snapshot)=>{
      this.flag=snapshot.child(username).exists();
    });
    
  }

  async componentDidMount() {
    await Font.loadAsync({
      KulimPark: require("../Fonts/KulimPark-Regular.ttf")
    });
    await this.setState({ fontsLoaded: true });
   
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <ActivityIndicator size="large" />;
    } else {
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
                  onChangeText={text => this.setState({ Full_Name: text })}
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
                  onChangeText={text => this.setState({ email: text })}
                  autoCapitalize="none"
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
                  onChangeText={text => this.setState({ username: text })}
                  autoCapitalize="none"
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
                      borderWidth: this.state.focus4
                        ? this.state.borderWidth
                        : 0,
                      backgroundColor: this.state.focus4
                        ? "#FFF"
                        : "rgba(211, 219, 219,0.5)"
                    }}
                    secureTextEntry={this.state.isHidden ? true : false}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
            <View style={styles.ButtonBox}>
              <View>
                <Text
                  style={{ ...styles.TextStylings, fontSize: 12, margin: 5 }}
                >
                  By clicking Sign Up, you are indicating that you have read and
                  acknowledge the
                  <Text> </Text>
                  <Text
                    style={{
                      color: "#12b0b5",
                      textDecorationLine: "underline"
                    }}
                  >
                    Terms of Service
                  </Text>{" "}
                  and
                  <Text> </Text>
                  <Text
                    style={{
                      color: "#12b0b5",
                      textDecorationLine: "underline"
                    }}
                  >
                    Privacy Notice.
                  </Text>
                </Text>
              </View>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple()}
                onPress={() => this.bundleDataAndSend()}
              >
                <View
                  style={
                    this.state.Full_Name &&
                    this.state.email &&
                    this.state.username &&
                    this.state.password
                      ? styles.Buttons
                      : styles.DisableButton
                  }
                >
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
