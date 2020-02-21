import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native-paper";
import Svg, { Circle, G, Path, Rect, TSpan } from "react-native-svg";
import * as firebase from "firebase";
import firebaseConfig from "../../config";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
export class Profile extends Component {
  constructor() {
    super();
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.state = {
      fontsLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      WorkSans: require("../Fonts/Work-Sans.ttf"),
      ProText: require("../Fonts/SFPRO.ttf")
    });
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then(snapshot => {
        var full_name =
          (snapshot.val() && snapshot.val().full_Name) || "Anonymous";
          var username =
          (snapshot.val() && snapshot.val().username) || "Anonymous";
          var email =
          (snapshot.val() && snapshot.val().email) || "Anonymous";
        this.setState({ full_Name: full_name, email: email, username: username });
      });
    await this.setState({ fontsLoaded: true });
  }
  render() {
    if (this.state.fontsLoaded)
      return (
        // Parent
        <View style={styles.container}>
          {/* Upper Flex Box */}
          <View style={styles.upperBox}>
            <View style={styles.headingBox}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "WorkSans",
                  color: "#242134"
                }}
              >
                MY PROFILE
              </Text>
            </View>
            <View style={styles.profilePicture}>
              <View style={styles.profile}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="190"
                  height="190"
                  viewBox="0 0 135 135"
                >
                  <Circle
                    id="Ellipse_1"
                    data-name="Ellipse 1"
                    cx="66"
                    cy="66"
                    r="66"
                    transform="translate(0 0)"
                    fill="#E8EBF1"
                  />
                </Svg>
                <View style={styles.cameraIcon}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 40 40"
                  >
                    <G
                      id="Group_1057"
                      data-name="Group 1057"
                      transform="translate(-221 -207)"
                    >
                      <Circle
                        id="Ellipse_4"
                        data-name="Ellipse 4"
                        cx="20"
                        cy="20"
                        r="20"
                        transform="translate(221 207)"
                        fill="rgba(22, 218, 224,0.8)"
                        opacity="0.8"
                      />
                      <G
                        id="_112-photo-camera-1"
                        data-name="112-photo-camera-1"
                        transform="translate(232.111 220.333)"
                      >
                        <G
                          id="Group_1045"
                          data-name="Group 1045"
                          transform="translate(0 0)"
                        >
                          <G
                            id="Group_1044"
                            data-name="Group 1044"
                            transform="translate(0 0)"
                          >
                            <Path
                              id="Path_1470"
                              data-name="Path 1470"
                              d="M16.79,53.57H13.267L12.5,51.58a.593.593,0,0,0-.553-.38H5.827a.593.593,0,0,0-.553.38l-.763,1.99H.988A.989.989,0,0,0,0,54.558v9.877a.989.989,0,0,0,.988.988h15.8a.989.989,0,0,0,.988-.988V54.558A.989.989,0,0,0,16.79,53.57Zm-.2,10.667H1.185V54.756H4.919a.593.593,0,0,0,.553-.38l.763-1.99h5.309l.763,1.99a.593.593,0,0,0,.553.38h3.733v9.482Z"
                              transform="translate(0 -51.2)"
                              fill="#fff"
                            />
                          </G>
                        </G>
                        <G
                          id="Group_1047"
                          data-name="Group 1047"
                          transform="translate(4.721 3.654)"
                        >
                          <G
                            id="Group_1046"
                            data-name="Group 1046"
                            transform="translate(0 0)"
                          >
                            <Path
                              id="Path_1471"
                              data-name="Path 1471"
                              d="M140.132,156.439a4.168,4.168,0,1,0,4.168,4.168A4.173,4.173,0,0,0,140.132,156.439Zm0,7.151a2.983,2.983,0,1,1,2.983-2.983A2.986,2.986,0,0,1,140.132,163.59Z"
                              transform="translate(-135.964 -156.439)"
                              fill="#fff"
                            />
                          </G>
                        </G>
                      </G>
                    </G>
                  </Svg>
                </View>
              </View>
            </View>
            <View style={{ ...styles.headingBox, top: "-5%" }}>
              <Text
                style={{
                  fontSize: 40,
                  fontFamily: "ProText",
                  color: "#242134"
                }}
              >
                {this.state.full_Name}
              </Text>
            </View>
          </View>
          {/*Lower Box*/}
          <View style={styles.lowerBox}>
            <View style={styles.lowerHeading}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "WorkSans",
                    color: "#242134"
                  }}
                >
                  ABOUT ME
                </Text>
              </View>
              <View>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="180"
                  height="2"
                  viewBox="0 0 180 2"
                >
                  <Rect
                    id="Rectangle_1738"
                    data-name="Rectangle 1738"
                    width="180"
                    height="2"
                    fill="#16dae0"
                  />
                </Svg>
              </View>
            </View>
            <View style={styles.details}>
            <View style={styles.subDetails}>
                  <Text style={{color: '#707070' , fontSize: 18}}>Username</Text>
                  <Text>{this.state.username}</Text>
            </View>
            <View style={styles.subDetails}>
                  <Text style={{color: '#707070' , fontSize: 18}}>Email</Text>
                  <Text>{this.state.email}</Text>
            </View>
            </View>
            
            </View>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple()}
              >
            <View style={styles.button}><Text style={styles.textStylings}>Log Out</Text></View>
          </TouchableNativeFeedback>
         
        </View>
      );
    else {
      return <ActivityIndicator size="large" />;
    }
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  },
  upperBox: {
    height: "50%",
    display: "flex",
    justifyContent: "space-evenly"
  },
  headingBox: {
    justifyContent: "center",
    alignItems: "center"
  },
  profilePicture: {
    alignItems: "center"
  },
  profile: {
    justifyContent: "center",
    paddingRight: "3%"
  },
  cameraIcon: {
    position: "absolute",
    alignSelf: "flex-end"
  },
  lowerHeading: {
    alignItems: "center",
    height: "15%",
    justifyContent: "space-between",
  },
  details:{
    justifyContent: 'space-between',
  },subDetails:{
    marginLeft: "10%",
    marginBottom: "10%",
    justifyContent: 'space-between' 
  },
  lowerBox:{
    justifyContent: 'space-around'
  },
  button:{
      height: 30,
      backgroundColor: "#16dae0",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      marginHorizontal: "10%",
  },
  textStylings:{
    fontSize: 15,
    color: "white"
  },

});
