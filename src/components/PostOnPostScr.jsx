import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

const PostOnPostScr = ({ post }) => {
  const navigation = useNavigation();
  const { coords, locationName } = post;

  return (
    <View style={styles.post}>
      <Image style={styles.postImage} source={{ uri: post.image }} />
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.postData}>
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
    fontWeight: "500",
  },
  grayIcon: { transform: [{ rotateY: "180deg" }] },
  commentsNumber: { color: "#BDBDBD", fontSize: 16, paddingRight: 4 },
  commentsWrap: { flexDirection: "row", gap: 6 },
  locationWrap: { flexDirection: "row", gap: 6 },
  location: { color: "#212121", fontSize: 16, textDecorationLine: "underline" },
  pressedStyle: { backgroundColor: "#bdbdbd7a", borderRadius: 8 },
  postData: { flexDirection: "row", justifyContent: "space-between" },
});

export default PostOnPostScr;
