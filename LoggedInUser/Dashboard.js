import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from "react-navigation";
import Profile from "./Screens/Profile";
import Friends from "./Screens/Friends/Friends";

function Messages() {
  return (
    <View>
      <Text>Messages</Text>
    </View>
  );
}

const DashBoard = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Messages: {
        screen: Messages,
        navigationOptions: {
          tabBarLabel: "Messages",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-quote" size={24} color={tintColor} />
          )
        }
      },
      Friends: {
        screen: Friends,
        navigationOptions: {
          tabBarLabel: "Friends",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-people" size={24} color={tintColor} />
          )
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: "Profile",
          tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-person" size={24} color={tintColor} />
          )
        }
      }
    },
    {
      initialRouteName: "Friends",
      activeColor: "#16dae0",
      barStyle: { backgroundColor: "#fff" },
      shifting: true,
      inactiveColor: "grey"
    }
  )
);

export default DashBoard;
