import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { GiftedChat } from "react-native-gifted-chat";
import { Profile } from "../components/ProfilePic";

const ChatScreen = ({ navigation, route }) => {
  const { online } = route.params;

  navigation.setOptions({
    title: online.username,
    headerRight: (props) => <Profile {...props} />,
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: online.id,
          name: online.username,
          avatar: online.image,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
