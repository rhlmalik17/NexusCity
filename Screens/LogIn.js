import React, { Component } from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";
import * as Font from "expo-font";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

export class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      borderWidth: 2,
      focus: false,
      focus2: false,
      isHidden: true
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      KulimPark: require("../Fonts/KulimPark-Regular.ttf")
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ParentBox}>
          <View style={styles.Heading}>
            <Text style={styles.TextStylings}>Log In</Text>
          </View>
          <View style={styles.InputParent}>
            <View>
              <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                Username
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
              />
            </View>
            <View style={{ top: 30 }}>
              <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                Password
              </Text>
              <View>
                <View
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    left: 360,
                    top: 18,
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
                  onFocus={() => this.setState({ focus2: true })}
                  onBlur={() => this.setState({ focus2: false })}
                  style={{
                    ...styles.Inputs,
                    borderWidth: this.state.focus2 ? this.state.borderWidth : 0,
                    backgroundColor: this.state.focus2
                      ? "#FFF"
                      : "rgba(211, 219, 219,0.5)"
                  }}
                  secureTextEntry={this.state.isHidden ? true : false}
                />
              </View>
            </View>
          </View>
          <View style={styles.Buttons}></View>
        </View>
      </View>
    );
  }
}

export default LogIn;

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
    height: 100,
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  Buttons: {},
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
    height: 55,
    borderColor: "#72e8ed",
    marginRight: 20,
    borderRadius: 10,
    padding: 20,
    fontFamily: "KulimPark"
  }
};
