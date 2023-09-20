import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { handleLike } from "../redux/operations";
import { selectUID } from "../redux/selectors";

const PostOnPostScr = ({ post }) => {
  const uid = useSelector(selectUID);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { coords, locationName } = post;

  const handleLikePress = () => {
    dispatch(handleLike({ uid, postID: post.id }));
  };

  return (
    <View style={styles.post}>
      <Image style={styles.postImage} source={{ uri: post.image }} />
      <View style={styles.titleWrap}>
        <Text style={styles.displayName}>{post.displayName} | </Text>
        <Text style={styles.title}>{post.title}</Text>
      </View>
      <View style={styles.postData}>
        <View style={styles.statsWrap}>
          <Pressable
            onPress={() => navigation.navigate("Comments", { postID: post.id })}
            style={({ pressed }) => [
              styles.commentsWrap,
              pressed && styles.pressedStyle,
            ]}
          >
            <Feather
              name="message-circle"
              size={24}
              color="#BDBDBD"
              style={styles.grayIcon}
            />
            <Text style={styles.commentsNumber}>{post.comments.length}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleLikePress();
            }}
            style={({ pressed }) => [
              styles.likesWrap,
              pressed && styles.pressedStyle,
            ]}
          >
            <Feather
              name="thumbs-up"
              size={22}
              color="#FF6C00"
              style={styles.likeIcon}
            />
            <Text style={styles.likesNumber}>{post.likes.length}</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Map", { coords: coords })}
          style={({ pressed }) => [
            styles.locationWrap,
            pressed && styles.pressedStyle,
          ]}
        >
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={styles.grayIcon}
          />
          <Text style={styles.location}>{locationName}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: { marginVertical: 16 },
  postImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 2,
  },
  title: {
    paddingVertical: 8,
    color: "#212121",
    fontSize: 16,
    fontWeight: "400",
  },
  displayName: {
    paddingVertical: 8,
    color: "#212121",
    fontSize: 16,
    fontWeight: "500",
  },
  titleWrap: { flex: 1, justifyContent: "flex-start", flexDirection: "row" },
  grayIcon: { transform: [{ rotateY: "180deg" }] },
  statsWrap: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  commentsNumber: { color: "#BDBDBD", fontSize: 16, paddingRight: 4 },
  likesNumber: { color: "#212121", fontSize: 16 },
  likesWrap: { flexDirection: "row", gap: 6 },
  commentsWrap: { flexDirection: "row", gap: 6 },
  locationWrap: { flexDirection: "row", gap: 6 },
  location: { color: "#212121", fontSize: 16, textDecorationLine: "underline" },
  pressedStyle: { backgroundColor: "#bdbdbd7a", borderRadius: 8 },
  postData: { flexDirection: "row", justifyContent: "space-between" },
});

export default PostOnPostScr;
