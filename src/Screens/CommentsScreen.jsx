import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Comment from "../components/Comment";
import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { post } = route.params;
  const [newComment, setNewComment] = useState("");
  const [inputFocus, setInputFocus] = useState(false);

  const onCommentSubmit = () => {
    if (newComment.trim().length > 0) {
      console.log("Comment is added to comments array");
      setNewComment("");
    } else {
      console.log("some kind of comment validation error");
    }
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={post.image} style={styles.image} />
          <FlatList
            data={post.comments}
            renderItem={({ item }) => <Comment comment={item} />}
            keyExtractor={(item) => item.commentID}
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
  container: {
    flex: 1,
    minHeight: 672,
    backgroundColor: "white",
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
    position: "absolute",
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
