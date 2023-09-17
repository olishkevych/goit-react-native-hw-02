import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, FlatList } from "react-native";
import PostOnProfileScreen from "../components/PostOnProfileScreen";
import ProfileHeader from "../components/ProfileHeader";
import { selectPosts } from "../redux/selectors";

const ProfileScreen = () => {
  const posts = useSelector(selectPosts);

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
