import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";

import RobotText from "./RobotText";
import { ngrokurl } from "../ngrok/URL";

const UsersComponents = ({ user, navigation }) => {
  const [requestedUser, setRequestedUser] = useState({});

  let Touch =
    Platform.OS && Platform.Version > 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${ngrokurl}/api/customer/${user.user}`);
      setRequestedUser({ ...data.data, id: user.user, image: user.image });
    };
    fetchData();
  }, [user]);

  return (
    <Touch
      onPress={() => navigation.navigate("Chat", { online: requestedUser })}
    >
      <View style={styles.component}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: user.image,
            }}
          />
        </View>
        <View style={styles.headline}>
          <RobotText style={styles.font}>{requestedUser.username}</RobotText>
          <RobotText style={styles.moment}>Messaged You 1 hour ago</RobotText>
        </View>
      </View>
    </Touch>
  );
};

export default UsersComponents;

const styles = StyleSheet.create({
  component: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ede7f6",
    elevation: 7,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    marginVertical: 7,
  },
  imageContainer: {
    height: 90,
    width: 90,
    overflow: "hidden",
    borderRadius: 100,
    marginRight: 10,
    elevation: 3,
  },
  image: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    resizeMode: "cover",
  },
  headline: {},
  font: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  moment: {
    color: "grey",
    fontStyle: "italic",
    marginTop: 5,
  },
});
