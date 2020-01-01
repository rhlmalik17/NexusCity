import React, { Component } from "react";
import { Text, View } from "react-native";

export class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> SIGN UP SCREEN </Text>
      </View>
    );
  }
}

export default SignUp;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
};
