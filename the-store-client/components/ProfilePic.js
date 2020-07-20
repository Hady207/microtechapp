import React from "react";
import { Avatar } from "react-native-paper";

const Profile = (props) => {
  return (
    <Avatar.Image
      size={30}
      style={{ resizeMode: "contain" }}
      source={require("../assets/profile.png")}
    />
  );
};

export { Profile };
