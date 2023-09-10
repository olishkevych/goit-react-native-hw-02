import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [postData, setPostData] = useState({});
  const [inputFocus, setInputFocus] = useState({});

  const navigation = useNavigation();

  const isPostComplete = () => {
    if (
      postData.image &&
      postData.title &&
      postData.location &&
      postData.title.length > 0 &&
      postData.location.length > 0
    )
      return true;
    else return false;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [17, 12],
      quality: 1,
    });

    if (!result.canceled) {
      setPostData({ ...postData, image: result.assets[0].uri });
    }
  };

  const onFocus = (field) => {
    setInputFocus((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const onBlur = (field) => {
    setInputFocus((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const onDeleteDraft = () => {
    setPostData({});
  };

  onSavePost = () => {
    console.log("Adding post to the array function");
    setPostData({});
    navigation.navigate("Posts");
  };

  const handleInputChange = (field, newText) => {
    setPostData({ ...postData, [field]: newText.trim() });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <View style={styles.postImgContainer}>
            {postData.image && (
              <Image source={{ uri: postData.image }} style={styles.image} />
            )}
            <View style={styles.pickImgWrap}>
              <Pressable
                onPress={pickImage}
                style={[styles.pickImg, postData.image && styles.pickImgDimmed]}
              >
                <FontAwesome5
                  name="camera"
                  size={24}
                  color={postData.image ? "#FFFFFF" : "#BDBDBD"}
                />
              </Pressable>
            </View>
          </View>
          <Text style={styles.grayText}>
            {postData.image
              ? "Choose a different photo to upload"
              : "Upload your photo"}
          </Text>
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Title..."
              placeholderTextColor="#BDBDBD"
              style={[styles.input, inputFocus.title && styles.focusedInput]}
              onFocus={() => onFocus("title")}
              onBlur={() => onBlur("title")}
              onChangeText={(text) => handleInputChange("title", text)}
              defaultValue={postData.title}
            />
          </View>
          <View style={styles.inputWrap}>
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.locationPin}
            />
            <TextInput
              placeholder="Location..."
              placeholderTextColor="#BDBDBD"
              style={[
                styles.input,
                styles.locationInput,
                inputFocus.location && styles.focusedInput,
              ]}
              onFocus={() => onFocus("location")}
              onBlur={() => onBlur("location")}
              onChangeText={(text) => handleInputChange("location", text)}
              defaultValue={postData.location}
            />
          </View>
          <Pressable
            onPress={onSavePost}
            disabled={isPostComplete() ? false : true}
            style={({ pressed }) => [
              styles.publishButton,
              isPostComplete() && styles.publishButtonActive,
              isPostComplete() && pressed && styles.publishButtonPressed,
            ]}
          >
            <Text
              style={[
                styles.btnText,
                postData.image &&
                  postData.title &&
                  postData.location &&
                  styles.btnTextActive,
              ]}
            >
              Save
            </Text>
          </Pressable>
        </View>
        <View style={styles.deleteWrap}>
          <Pressable
            onPress={onDeleteDraft}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
            ]}
          >
            <Feather
              name="trash-2"
              size={24}
              color="#BDBDBD"
              style={styles.trashIcon}
            />
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "space-between",
  },
  postImgContainer: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    position: "relative",
  },
  pickImgWrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  pickImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  pickImgDimmed: { backgroundColor: " rgba(255, 255, 255, 0.30)" },
  image: {
    width: "100%",
    height: 240,
  },
  grayText: { color: "#BDBDBD", fontSize: 16, marginTop: 8, marginBottom: 32 },
  input: {
    fontSize: 16,
    color: "#212121",
    fontWeight: "500",
    height: 19,
  },

  inputWrap: {
    position: "relative",
    paddingTop: 16,
    paddingBottom: 15,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  locationInput: {
    marginLeft: 28,
  },
  locationPin: {
    position: "absolute",
    top: 13,
  },
  publishButton: {
    marginTop: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  publishButtonActive: {
    backgroundColor: "#FF6C00",
  },
  publishButtonPressed: { backgroundColor: "#ff6a00ab" },
  btnText: { color: "#BDBDBD", fontSize: 16 },
  btnTextActive: { color: "#FFF" },
  deleteButton: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonPressed: { backgroundColor: "#FF6C00" },
  deleteWrap: { alignItems: "center", justifyContent: "center" },
});

export default CreatePostsScreen;
