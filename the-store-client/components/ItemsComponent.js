import React from "react";
import {
  StyleSheet,
  Platform,
  Image,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import RobotoText from "../components/RobotText";
import RobotText from "../components/RobotText";

const ItemsComponent = (props) => {
  const { data, navigation } = props;
  const user = useSelector((state) => state.auth);

  const handleNavigation = () => {
    if (user.is_staff) {
      navigation.navigate("Users", { item: data });
    } else {
      navigation.navigate("Item", { item: data });
    }
  };

  let Touch =
    Platform.OS && Platform.Version > 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <Touch onPress={handleNavigation}>
      <View style={styles.component}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: data.image }} />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.productInfo}>
            <RobotoText style={styles.pdName}>{data.productName}</RobotoText>
            <RobotoText style={styles.pdPrice}>${data.price}</RobotoText>
          </View>
          {user.is_staff && (
            <View style={styles.usersMessages}>
              {data.enquiries >= 1 ? (
                <>
                  <Avatar.Text size={27} label={data.enquiries} />
                  <RobotText style={styles.enquiries}>
                    enquiries have been made
                  </RobotText>
                </>
              ) : (
                <RobotText style={styles.enquiries}>No enquiries</RobotText>
              )}
            </View>
          )}
        </View>
      </View>
    </Touch>
  );
};

export default ItemsComponent;

const styles = StyleSheet.create({
  component: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 6,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 7,
  },
  imageContainer: {
    height: 120,
    width: 120,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    resizeMode: "cover",
  },

  bodyContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#ede7f6",
  },
  productInfo: {
    flex: 1,
    width: "100%",
    // backgroundColor: "red",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  pdName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  pdPrice: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    fontStyle: "italic",
  },
  usersMessages: {
    flex: 1,
    // backgroundColor: "#ede7f6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  enquiries: {
    textAlign: "center",
    fontSize: 17,
    textTransform: "capitalize",
    // fontStyle: "italic",
  },
});
