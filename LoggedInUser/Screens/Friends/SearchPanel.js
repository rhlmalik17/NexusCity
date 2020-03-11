import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import SearchedResult from "./SearchedResult";
import * as firebase from "firebase";
import firebaseConfig from "../../../config";
import Icon from "react-native-vector-icons/Ionicons";

export default class SearchPanel extends Component {
  constructor() {
    super();
    this.state = {
      focus: false,
      isLoading: false,
      searchedResults: "",
      showResults: false
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  handleSearchAndMapFriends = async text => {
    let searched = text.toLowerCase();
    this.setState({ searchedResults: "", showResults: false });
    var query = firebase
      .database()
      .ref("users")
      .orderByKey();
    await query.once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        let username = childSnapshot.val().username;
        let email = childSnapshot.val().email;
        if (
          (childSnapshot.key != firebase.auth().currentUser.uid &&
            searched == username.toLowerCase()) ||
          searched == email.toLowerCase()
        ) {
          this.setState({
            searchedResults: childSnapshot.key,
            showResults: true
          });
        }
      });
    });
  };
  resetHandler = () => {
    this.setState({ searchedResults: [] });
    this.props.navigation.popToTop();
  };
  render() {
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
            onPress={() => this.resetHandler()}
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
          contentContainerStyle={{ ...styles.MappedResults, flexGrow: 1 }}
        >
          {this.state.showResults ? (
            <SearchedResult results={this.state.searchedResults} />
          ) : (
            <View></View>
          )}
        </ScrollView>
      </View>
    );
  }
}

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
  MappedResults: {
    alignItems: "center",
    marginTop: "5%"
  }
});
