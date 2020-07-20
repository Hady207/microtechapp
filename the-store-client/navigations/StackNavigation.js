import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import StoreScreen from "../screens/StoreScreen";
import ItemScreen from "../screens/ItemScreen";
import UsersScreen from "../screens/UsersScreen";
import ChatScreen from "../screens/ChatScreen";
import { Avatar } from "react-native-paper";

const Stack = createStackNavigator();

const Profile = (props) => {
  return (
    <Avatar.Image
      size={30}
      style={{ resizeMode: "contain" }}
      source={require("../assets/profile.png")}
    />
  );
};

const StackNavigation = () => {
  const option = {
    headerStyle: {
      backgroundColor: "purple",
    },
    headerTitleStyle: {
      color: "white",
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
    headerTitleAlign: "center",
    // headerRight: (props) => <Profile {...props} />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
    headerTintColor: "white",
    headerLeftContainerStyle: {
      marginLeft: 10,
      color: "white",
    },
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={option} />
      <Stack.Screen name="Store" component={StoreScreen} options={option} />
      <Stack.Screen name="Item" component={ItemScreen} options={option} />
      <Stack.Screen name="Users" component={UsersScreen} options={option} />
      <Stack.Screen name="Chat" component={ChatScreen} options={option} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
