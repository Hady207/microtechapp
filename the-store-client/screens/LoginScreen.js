import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { login_action } from "../store/actions/auth";
import axios from "axios";
import { ngrokurl } from "../ngrok/URL";
import { TextInput, Button } from "react-native-paper";
import RobotText from "../components/RobotText";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = useCallback(async () => {
    setLoading(true);
    try {
      const fetchdata = await axios.post(`${ngrokurl}/api/login/`, {
        username,
        password,
      });
      setLoading(false);
      dispatch(login_action(fetchdata.data));
      navigation.navigate("Store");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <View style={styles.titleContainer}>
          <RobotText style={styles.font}>Welcome To MT Store</RobotText>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Username"
            value={username}
            mode="outlined"
            onChangeText={(username) => setUsername(username)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Password"
            value={password}
            mode="outlined"
            // secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <Button
          style={styles.button}
          loading={loading}
          mode="contained"
          onPress={handleLogin}
        >
          Login
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },

  titleContainer: {
    marginBottom: 10,
  },

  inputContainer: {
    marginVertical: 6,
  },

  font: {
    textAlign: "center",
    fontSize: 19,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  button: {
    marginTop: 12,
  },
});
