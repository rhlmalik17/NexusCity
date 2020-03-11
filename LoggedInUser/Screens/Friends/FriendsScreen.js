import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import * as firebase from "firebase";
import { RFPercentage } from "react-native-responsive-fontsize";
export default class FriendsScreen extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false
    };
    if (!firebase.apps.length) {
      firebase.initializeApp("../../config.js");
    }
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      HugMeTight: require("../../Fonts/HugMeTight-GzZq.ttf"),
      Montserrat: require("../../Fonts/Montserrat-Bold.ttf"),
      KulimPark: require("../../../Fonts/KulimPark-Regular.ttf")
    });
    this.setState({ fontsLoaded: true });
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <View style={styles.HeaderStyle}>
            <View
              style={{
                height: "30%",
                paddingRight: "10%",
                top: 5,
                flexDirection: "row-reverse"
              }}
            >
              <Icon
                name="ios-notifications-outline"
                size={30}
                style={{
                  marginHorizontal: "5%"
                }}
                onPress={() =>
                  this.props.navigation.navigate("NotificationsPanel")
                }
              />
              <Icon
                name="ios-search"
                size={30}
                onPress={() => this.props.navigation.navigate("SearchPanel")}
              />
            </View>
            <View
              style={{
                height: "30%",
                justifyContent: "center",
                paddingHorizontal: "25%"
              }}
            >
              <Text style={{ fontSize: 25, fontFamily: "Montserrat" }}>
                Friends
              </Text>
            </View>
          </View>
          <View style={styles.defaultCard}>
            <Text style={styles.defaultMessage}>No Friends to Show!!</Text>
          </View>
        </View>
      );
    } else {
      return <ActivityIndicator style={styles.container} size="large" />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  HeaderStyle: {
    flex: 1,
    backgroundColor: "#FFF",
    height: "20%",
    width: "100%",
    alignItems: "stretch",
    borderBottomLeftRadius: 100,
    justifyContent: "space-evenly"
  },
  friendsBox: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  defaultCard: {
    flex: 3.5,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  defaultMessage: {
    fontFamily: "HugMeTight",
    fontSize: RFPercentage(3),
    color: "#999999"
  }
});
