import React, { Component } from "react";
import { Text, View } from "react-native";

export class NotificationsPanel extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default NotificationsPanel;
