import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

import userPic from "../img/userPic.jpg";
import testAvatar from "../img/test3.jpg";
import BackgroundImg from "../img/background.png";
import user from "../data/userData";
import posts from "../data/postsData";
import PostOnProfileScreen from "../components/PostOnProfileScreen";
import ProfileHeader from "../components/ProfileHeader";

const ProfileScreen = () => {
  return (
    <FlatList
      data={posts}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <PostOnProfileScreen post={item} />}
      keyExtractor={(item) => item.id}
      style={styles.container}
      ListHeaderComponent={ProfileHeader}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#FFF",
    flexGrow: 1,
  },
});

export default ProfileScreen;
