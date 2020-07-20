import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { ngrokurl } from "../ngrok/URL";
import User from "../components/UsersComponents";
import { Profile } from "../components/ProfilePic";

// const ngrok = `https://2f64d1a21ffe.ngrok.io/api/enquires/${item.id}`;
const UsersScreen = ({ route, navigation }) => {
  // const { name } = useContext(StoreContext);
  const { item } = route.params;

  const [listUsers, setListUsers] = useState([]);
  navigation.setOptions({
    title: item.productName,
    headerRight: (props) => <Profile {...props} />,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${ngrokurl}/api/enquires/${item.id}`);
      setListUsers(data.data);
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.screen}>
      {listUsers.map((info) => (
        <User user={info} key={info.user} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 5,
  },
});
