import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as firebase from "firebase";
import firebaseConfig from "../../../config";
import Icon from "react-native-vector-icons/Entypo";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ActivityIndicator } from "react-native-paper";
import * as Font from "expo-font";
import Toast from "react-native-simple-toast";

export class SearchedResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUrl: "",
      username: "",
      name: "",
      defaultProfile:
        "https://drive.google.com/uc?export=view&id=1OhKo6sBVYzQQddpEx-KxoLLrVJ5WdqLG",
      isLoaded: false,
      friendRequestSend: false
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  componentDidMount = async () => {
    await firebase
      .database()
      .ref("users/" + this.props.results)
      .once("value")
      .then(async snapshot => {
        await firebase
          .storage()
          .ref("ProfileImages/" + snapshot.val().profileImage)
          .getDownloadURL()
          .then(url => {
            this.setState({ profileUrl: url });
          })
          .catch(() => {
            this.setState({
              profileUrl:
                "https://drive.google.com/uc?export=view&id=1OhKo6sBVYzQQddpEx-KxoLLrVJ5WdqLG"
            });
          });
        this.setState({
          username: snapshot.val().username,
          name: snapshot.val().full_Name
        });
      });
    await Font.loadAsync({
      WorkSans: require("../../Fonts/Work-Sans.ttf"),
      ProText: require("../../Fonts/SFPRO.ttf")
    });
    this.setState({ isLoaded: true });
  };

  handleSendFriendRequest = async () => {
    //Change Icon

    this.setState({ friendRequestSend: true });
    Toast.show("Friend Request Sent");
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <View
          style={{
            alignSelf: "stretch",
            ...this.props.style,
            justifyContent: "space-between",
            ...styles.container
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              height: "100%",
              width: "50%"
            }}
          >
            <View style={styles.profileAvatar}>
              <Image
                source={{
                  uri: this.state.profileUrl
                    ? this.state.profileUrl
                    : this.state.defaultProfile
                }}
                style={styles.avatar}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-evenly"
              }}
            >
              <Text
                style={{
                  fontFamily: "WorkSans",
                  fontSize: RFPercentage(2),
                  color: "#303030"
                }}
              >
                {this.state.name}
              </Text>
              <Text
                style={{
                  fontFamily: "WorkSans",
                  fontSize: RFPercentage(1.5),
                  color: "#707070"
                }}
              >
                {this.state.username}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#e3e3e3",
              borderRadius: RFPercentage(10),
              marginHorizontal: "5%"
            }}
          >
            <Icon
              name={this.state.friendRequestSend ? "check" : "plus"}
              size={25}
              onPress={() => this.handleSendFriendRequest()}
            />
          </View>
        </View>
      );
    } else {
      return <ActivityIndicator size="large" />;
    }
  }
}

export default SearchedResult;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: "15%",
    shadowColor: "#000",
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "#f5f5f5",
    marginVertical: "2%"
  },
  profileAvatar: {
    height: "95%",
    width: "40%",
    backgroundColor: "#72e8ed",
    borderRadius: RFPercentage(50),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
    overflow: "hidden"
  },
  avatar: {
    height: "90%",
    width: "90%",
    borderRadius: RFPercentage(50)
  }
});
