import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import PostOnPostScr from "../components/PostOnPostScr";
import userPic from "../img/userPic.jpg";

import user from "../data/userData";
import posts from "../data/postsData";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileWrap}>
        <Image
          source={user.avatar ? user.avatar : userPic}
          style={styles.avatar}
          resizeMethod="scale"
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PostOnPostScr post={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "white",
  },
  profileWrap: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 16,
  },
  userInfo: {
    justifyContent: "center",
    height: 60,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 16,
  },
  username: { color: "#212121", fontSize: 13, fontWeight: "700" },
  email: { color: "#212121", fontSize: 11 },
});

export default PostsScreen;
