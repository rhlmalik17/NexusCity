import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  BackHandler
} from "react-native";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import * as firebase from "firebase";

export class Friends extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      focus: false,
      displayPanel: "none",
      isLoading: false,
      email: "",
      username: "",
      friends: []
    };
    if (!firebase.apps.length) {
      firebase.initializeApp("../../config.js");
    }
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then(snapshot => {
        var username =
          (snapshot.val() && snapshot.val().username) || "Anonymous";
        var email = (snapshot.val() && snapshot.val().email) || "Anonymous";
        this.setState({ email: email, username: username });
      });
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      HugMeTight: require("../Fonts/HugMeTight-GzZq.ttf"),
      Montserrat: require("../Fonts/Montserrat-Bold.ttf"),
      KulimPark: require("../../Fonts/KulimPark-Regular.ttf")
    });
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.setState({ displayPanel: "none" });
      return true;
    });
    this.setState({ fontsLoaded: true });
  };

  handleSearchAndMapFriends = async text => {
    this.setState({ isLoading: true });
    await firebase
      .database()
      .ref("users")
      .orderByKey()
      .once("value")
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          // key will be "ada" the first time and "alan" the second time
          let email = childSnapshot.child("email").val();
          let username = childSnapshot.child("username").val();
          if (
            (text === email || text === username) &&
            text !== this.state.email &&
            text !== this.state.username
          ) {
            alert("Found it!");
          }
        });
      });
  };

  SearchPanel = () => {
    return (
      <View
        style={{
          ...styles.searchPanelStyle
        }}
      >
        <Animatable.View
          style={{ marginTop: "10%" }}
          animation="fadeInRight"
          duration={500}
        >
          <Icon
            name="ios-arrow-back"
            size={40}
            style={{ position: "absolute", marginLeft: "5%" }}
            color="#72e8ed"
            onPress={() => this.setState({ displayPanel: "none" })}
          />
          <TextInput
            style={{
              ...styles.Inputs,
              borderWidth: this.state.focus ? 2 : 0,
              borderColor: this.state.focus ? "#72e8ed" : "#fff",
              backgroundColor: this.state.focus
                ? "#FFF"
                : "rgba(211, 219, 219,0.5)"
            }}
            placeholder={"Search via Email or Username.."}
            onFocus={() => this.setState({ focus: true })}
            onBlur={() => this.setState({ focus: false })}
            autoCapitalize={"none"}
            onChangeText={text => this.handleSearchAndMapFriends(text)}
          />
        </Animatable.View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          onPress={() => this.handleKeyBoardDismiss()}
        >
          {/* MAP THE SEARCH RESULTS HERE */}
          {this.state.isLoading ? (
            <View style={styles.MappedResults}>
              <Text>Loading...</Text>
            </View>
          ) : (
            <View></View>
          )}
        </ScrollView>
      </View>
    );
  };

  handleKeyBoardDismiss = () => {
    Keyboard.dismiss;
    this.setState({ isLoading: false });
  };

  HeaderFriends = () => {
    return (
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
          />
          <Icon
            name="ios-search"
            size={30}
            onPress={() => this.setState({ displayPanel: "flex" })}
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
    );
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <this.HeaderFriends />
          {this.state.displayPanel === "none" ? (
            <View></View>
          ) : (
            <this.SearchPanel />
          )}
        </View>
      );
    } else {
      return <ActivityIndicator style={styles.container} size="large" />;
    }
  }
}

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  searchPanelStyle: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "stretch",
    zIndex: 2
  },
  Inputs: {
    height: 50,
    borderRadius: 10,
    fontFamily: "KulimPark",
    alignSelf: "stretch",
    paddingLeft: "5%",
    marginLeft: "13%",
    marginRight: "10%"
  },
  HeaderStyle: {
    backgroundColor: "#FFF",
    height: "20%",
    width: "100%",
    alignItems: "stretch",
    borderBottomLeftRadius: 100,
    justifyContent: "space-evenly",
    position: "absolute"
  },
  MappedResults: {
    alignItems: "center"
  },
  friendsBox: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  }
});
