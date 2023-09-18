import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

import {
  selectDisplayName,
  selectPosts,
  selectUserEmail,
  selectPhotoURL,
  selectUID,
  selectIsAuthorized,
  selectIsLoading,
} from "../redux/selectors";
import { getPosts } from "../redux/operations";
import PostOnPostScr from "../components/PostOnPostScr";
import userPic from "../img/userPic.jpg";
import { useNavigation } from "@react-navigation/native";
import NoPostsText from "../components/NoPostsText";

const PostsScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const displayName = useSelector(selectDisplayName);
  const email = useSelector(selectUserEmail);
  const photoURL = useSelector(selectPhotoURL);
  const uid = useSelector(selectUID);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getPosts(uid));
  }, [dispatch, uid]);

  return (
    <View style={styles.container}>
      <View style={styles.profileWrap}>
        <Image
          source={photoURL ? { uri: photoURL } : userPic}
          style={styles.avatar}
          resizeMethod="scale"
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{displayName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PostOnPostScr post={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={NoPostsText}
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
