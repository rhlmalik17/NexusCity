import React, { Component } from "react";
import {
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator
} from "react-native";
import * as Font from "expo-font";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../Stylings/LoginScreen_styles";
import * as firebase from "firebase";
import firebaseConfig from "../config";
import { StackActions, NavigationActions } from "react-navigation";
import { RFPercentage } from "react-native-responsive-fontsize";
export class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      borderWidth: 2,
      focus: false,
      focus2: false,
      isHidden: true,
      fontsLoaded: false,
      username: "",
      password: "",
      willLoad: false
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.checkAndLogin = this.checkAndLogin.bind(this);
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          if (firebase.auth().currentUser.emailVerified) {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "DashBoard" })]
            });
            this.props.navigation.dispatch(resetAction);
            // this.props.navigation.navigate('DashBoard');
          } else if (!firebase.auth().currentUser.emailVerified) {
            this.setState({ willLoad: true });
          }
        } else {
          this.setState({ willLoad: true });
        }
      }.bind(this)
    );
  }
  checkAndLogin() {
    if (this.state.username && this.state.password) {
      let username = this.state.username;
      let password = this.state.password;
      firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => {
          this.setState({ username: "", password: "" });
          let user = firebase.auth().currentUser;
          if (user.emailVerified) {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "DashBoard" })]
            });
            this.props.navigation.dispatch(resetAction);
          } else {
            this.props.navigation.navigate("EmailVerification");
          }
        })
        .catch(
          function(error) {
            this.setState({ username: "", password: "" });
            alert(error);
          }.bind(this)
        );
    } else {
      alert("Enter all the fields");
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      KulimPark: require("../Fonts/KulimPark-Regular.ttf")
    });
    await this.setState({ fontsLoaded: true });
  }
  render() {
    if (!this.state.fontsLoaded || !this.state.willLoad) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.ParentBox}>
            <View style={styles.Heading}>
              <Text style={styles.TextStylings}>Log In</Text>
            </View>
            <View style={styles.InputParent}>
              <View>
                <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                  Email
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
                  value={this.state.username}
                  onChangeText={text => this.setState({ username: text })}
                  autoCapitalize="none"
                />
              </View>
              <View style={{ top: 30 }}>
                <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                  Password
                </Text>
                <View style={{ justifyContent: "center" }}>
                  <View
                    style={{
                      zIndex: 2,
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "flex-end",
                      top: "40%",
                      right: RFPercentage(3)
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
                    onFocus={() => this.setState({ focus2: true })}
                    onBlur={() => this.setState({ focus2: false })}
                    style={{
                      ...styles.Inputs,
                      borderWidth: this.state.focus2
                        ? this.state.borderWidth
                        : 0,
                      backgroundColor: this.state.focus2
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
              <TouchableOpacity>
                <Text
                  style={{
                    ...styles.TextStylings,
                    fontSize: 15,
                    margin: 5,
                    color: "#12b0b5"
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.checkAndLogin()}>
                <View
                  style={
                    this.state.username && this.state.password
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
                    Log In
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignUpScreen")}
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
                  New Here? Register Here!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

export default LogIn;
