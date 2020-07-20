import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import { ngrokurl } from "../ngrok/URL";
import ItemComponent from "../components/ItemsComponent";
import { Profile } from "../components/ProfilePic";
import { SimpleLineIcons } from "@expo/vector-icons";
// const testObj = {
//   productName: "Samsung S20",
//   price: 1000,
//   image:
//     "https://images.unsplash.com/photo-1583225173317-5de81344a54e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
// };

// const testObj2 = {
//   productName: "Dell XPS",
//   price: 1000,
//   image:
//     "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
// };

// const testObj3 = {
//   productName: "Playstation 1",
//   price: 100,
//   image:
//     "https://images.unsplash.com/photo-1531390658120-e06b58d826ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80",
// };

const url = "http://localhost:8000/api/items/";
const ngrok = "https://2f64d1a21ffe.ngrok.io/api/items/";

const StoreScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth);

  const [items, setItems] = useState([]);
  navigation.setOptions({
    headerRight: (props) => <Profile {...props} />,
    headerLeft: (props) => (
      <SimpleLineIcons name="logout" size={24} color="white" {...props} />
    ),
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${ngrokurl}/api/items/`);
        setItems(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [ngrokurl]);

  return (
    <ScrollView style={styles.screen}>
      {items.map((item) => (
        <ItemComponent key={item.id} navigation={navigation} data={item} />
      ))}
      {/* <ItemComponent navigation={navigation} data={testObj} />
      <ItemComponent navigation={navigation} data={testObj2} />
      <ItemComponent navigation={navigation} data={testObj3} /> */}
    </ScrollView>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 5,
  },
});
