import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as firebase from "firebase";
import firebaseConfig from "../../../config";
import Icon from "react-native-vector-icons/Entypo";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ActivityIndicator } from "react-native-paper";
import * as Font from "expo-font";
import Toast, { DURATION } from "react-native-easy-toast";
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
  db = {
    sentTo: async (receiver, currentUser) => {
      await firebase
        .database()
        .ref(
          "users/" + currentUser + "/FriendRequests/sentTo/" + receiver + "/"
        )
        .update({
          status: "Pending"
        });
    },
    receivedBy: async (receiver, currentUser) => {
      await firebase
        .database()
        .ref(
          "users/" +
            receiver +
            "/FriendRequests/receivedBy/" +
            currentUser +
            "/"
        )
        .update({
          status: "Pending"
        });
    }
  };
  componentDidMount = async () => {
    let currentUser = firebase.auth().currentUser.uid;
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
    await firebase
      .database()
      .ref("users/" + currentUser + "/FriendRequests/sentTo/")
      .once("value")
      .then(snapshot => {
        if (snapshot.child(this.props.results).exists()) {
          this.setState({ friendRequestSend: true });
        } else {
          this.setState({ friendRequestSend: false });
        }
      });
    this.setState({ isLoaded: true });
  };

  handleSendFriendRequest = async () => {
    if (!this.state.friendRequestSend) {
      this.setState({ friendRequestSend: true });
      let receiver = this.props.results;
      let currentUser = firebase.auth().currentUser.uid;

      Promise.all([
        this.db.sentTo(receiver, currentUser),
        this.db.receivedBy(receiver, currentUser)
      ]);

      this.refs.toast.show("Friend Request Sent!");
    }
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
          <Toast
            ref="toast"
            position={"bottom"}
            positionValue={RFPercentage(30)}
            fadeOutDuration={500}
            opacity={0.7}
          />
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
    height: RFPercentage(12),
    width: RFPercentage(12),
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
