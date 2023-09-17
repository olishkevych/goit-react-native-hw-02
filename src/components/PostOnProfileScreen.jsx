import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

const PostOnProfileScreen = ({ post }) => {
  const navigation = useNavigation();
  const { coords } = post;
  return (
    <View style={styles.post}>
      <Image style={styles.postImage} source={{ uri: post.image }} />
      <Text style={styles.title}>{post.title}</Text>
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
              color="#FF6C00"
              style={styles.commentIcon}
            />
            <Text style={styles.commentsNumber}>{post.comments.length}</Text>
          </Pressable>
          <View style={styles.likesWrap}>
            <Feather
              name="thumbs-up"
              size={22}
              color="#FF6C00"
              style={styles.likeIcon}
            />
            <Text style={styles.likesNumber}>{post.likes}</Text>
          </View>
        </View>
        <Pressable
          onPress={(post) => navigation.navigate("Map", { coords: coords })}
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
          <Text style={styles.location}>{post.locationName}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: { marginVertical: 16, paddingHorizontal: 16 },
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
    fontWeight: "500",
  },
  statsWrap: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  commentIcon: { transform: [{ rotateY: "180deg" }] },
  commentsNumber: { color: "#212121", fontSize: 16 },
  likesNumber: { color: "#212121", fontSize: 16 },
  commentsWrap: { flexDirection: "row", gap: 6 },
  likesWrap: { flexDirection: "row", gap: 6 },
  locationWrap: { flexDirection: "row", gap: 6 },
  location: { color: "#212121", fontSize: 16, textDecorationLine: "underline" },
  pressedStyle: { backgroundColor: "#bdbdbd7a", borderRadius: 8 },
  postData: { flexDirection: "row", justifyContent: "space-between" },
});

export default PostOnProfileScreen;
