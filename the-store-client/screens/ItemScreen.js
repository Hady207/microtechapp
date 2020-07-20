import React, { useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Profile } from "../components/ProfilePic";
import { ngrokurl } from "../ngrok/URL";
import RobotText from "../components/RobotText";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

const ItemScreen = ({ navigation, route }) => {
  const { enquire, setEnquire } = useState(false);
  const { item } = route.params;
  const user = useSelector((state) => state.auth);

  navigation.setOptions({
    title: item.productName,
    headerRight: (props) => <Profile {...props} />,
  });

  const handleEnquire = async () => {
    const data = await axios.get(
      `${ngrokurl}/api/items/${item.id}/enquire/${user.id}`,
    );
    setEnquire(true);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: item.image }} style={styles.image}>
          <View style={styles.backgroundText}>
            <RobotText style={styles.title}>{item.productName}</RobotText>
            <RobotText style={styles.price}>{item.price}</RobotText>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <RobotText style={styles.desc}>{item.description}</RobotText>
          <Button mode="contained" disabled={enquire} onPress={handleEnquire}>
            {enquire ? "seller will get back to you" : "Enquire"}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flexDirection: "row",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  backgroundText: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  price: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  boxContainer: {
    flex: 1,
  },
  box: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    // alignItems: "center",
    justifyContent: "space-evenly",
  },
  desc: {
    fontSize: 16,
  },
});
