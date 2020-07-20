import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RobotText = ({ children, style }) => {
  return <Text style={{ ...style, ...styles.fonts }}>{children}</Text>;
};

export default RobotText;

const styles = StyleSheet.create({
  fonts: {
    fontFamily: "Roboto",
  },
});
