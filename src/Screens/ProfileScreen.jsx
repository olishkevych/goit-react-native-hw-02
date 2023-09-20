import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, FlatList } from "react-native";
import PostOnProfileScreen from "../components/PostOnProfileScreen";
import ProfileHeader from "../components/ProfileHeader";
import { selectPosts, selectUID } from "../redux/selectors";

const ProfileScreen = () => {
  const posts = useSelector(selectPosts);
  const uid = useSelector(selectUID);
  const userPosts = posts.filter((post) => post.userID === uid);

  return (
    <FlatList
      data={userPosts}
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
