import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { selectPhotoURL, selectUID } from "../redux/selectors";
import userPic from "../img/userPic.jpg";

const Comment = ({ comment }) => {
  const uid = useSelector(selectUID);
  const photoURL = useSelector(selectPhotoURL);
  const isOwnersComment = uid === comment.uid;

  return (
    <View
      style={[styles.commentWrap, isOwnersComment && styles.commentWrapRight]}
    >
      <Image
        source={
          isOwnersComment
            ? photoURL
              ? { uri: photoURL }
              : userPic
            : comment.photoURL
            ? { uri: comment.photoURL }
            : userPic
        }
        style={styles.avatar}
      />
      <View
        style={[
          styles.commentTextWrap,
          isOwnersComment && styles.commentTextWrapRight,
        ]}
      >
        <Text style={styles.commentText}>{comment.commentText}</Text>
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
