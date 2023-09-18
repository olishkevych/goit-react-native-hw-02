import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  ScrollView,
  Keyboard,
} from "react-native";
import {
  selectError,
  selectPhotoURL,
  selectPosts,
  selectUID,
} from "../redux/selectors";
import Comment from "../components/Comment";
import { addComment } from "../redux/operations";
import { formatTimestamp } from "../helpers/formatTimestamp";

import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { postID } = route.params;
  const [newComment, setNewComment] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const uid = useSelector(selectUID);
  const photoURL = useSelector(selectPhotoURL);
  const error = useSelector(selectError);
  const posts = useSelector(selectPosts);
  const renderedPost = posts.find((post) => post.id === postID);

  const dispatch = useDispatch();

  const onCommentSubmit = () => {
    if (newComment.trim().length > 0) {
      const formattedTimestamp = formatTimestamp(new Date()).toString();

      const commentToAdd = {
        commentText: newComment,
        uid: uid,
        photoURL: photoURL,
        timestamp: formattedTimestamp,
        id: uuid.v4(),
      };
      dispatch(addComment({ comment: commentToAdd, postID: postID }));
      if (!error) {
        setNewComment("");
        Keyboard.dismiss();
      }
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={{ uri: renderedPost.image }} style={styles.image} />
          <FlatList
            data={renderedPost.comments}
            renderItem={({ item }) => <Comment comment={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      <View style={styles.commentWrap}>
        <TextInput
          placeholder="Comment here..."
          placeholderTextColor="#BDBDBD"
          style={[styles.input, inputFocus && styles.focusedInput]}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onChangeText={(text) => setNewComment(text)}
          defaultValue={newComment}
          multiline={true}
        />

        <Pressable
          onPress={onCommentSubmit}
          style={({ pressed }) => [
            styles.sendBtn,
            pressed && styles.sendBtnPressed,
          ]}
        >
          <Feather name="arrow-up" size={24} color="#FFF" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 82,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  commentWrap: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },

  input: {
    paddingLeft: 16,
    paddingRight: 50,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    borderRadius: 28,
    color: "#212121",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Roboto",
    maxHeight: 100,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  focusedInput: { borderColor: "#FF6C00" },
  sendBtn: {
    position: "absolute",
    right: 24,
    bottom: 28,
    borderRadius: 54,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnPressed: { backgroundColor: "#ff6a00ab" },
});

export default CommentsScreen;
