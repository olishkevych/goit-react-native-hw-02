import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { selectPosts } from "../redux/selectors";

const NoPostsText = () => {
  const posts = useSelector(selectPosts);

  return <View>{posts.length === 0 && <Text>No posts yet...</Text>}</View>;
};

export default NoPostsText;
