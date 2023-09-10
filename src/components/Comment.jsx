import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import testAvatar from "../img/testAvatar.jpg";
import userPic from "../img/userPic.jpg";

const Comment = ({ comment }) => {
  const userID = "user2";
  const isOwnersComment = userID === comment.userID;
  return (
    <View
      style={[styles.commentWrap, isOwnersComment && styles.commentWrapRight]}
    >
      <Image
        source={isOwnersComment ? testAvatar : comment.userAvatar || userPic}
        style={styles.avatar}
      />
      <View
        style={[
          styles.commentTextWrap,
          isOwnersComment && styles.commentTextWrapRight,
        ]}
      >
        <Text style={styles.commentText}>{comment.text}</Text>
        <Text
          style={[styles.timestamp, isOwnersComment && styles.timestampRight]}
        >
          {comment.timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: { borderRadius: 28, height: 28, width: 28 },
  commentWrap: {
    columnGap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "top",
  },
  commentTextWrap: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    alignSelf: "stretch",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: 24,
  },
  commentText: { color: "#212121" },
  timestamp: {
    color: "#BDBDBD",
    fontSize: 10,
    marginTop: 8,
    textAlign: "right",
  },
  timestampRight: {
    textAlign: "left",
  },
  commentTextWrapRight: { borderTopRightRadius: 0, borderTopLeftRadius: 6 },
  commentWrapRight: { flexDirection: "row-reverse" },
});

export default Comment;
