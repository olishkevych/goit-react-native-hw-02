import React, { useState, useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraOrientation } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

import posts from "../data/postsData";

const CreatePostsScreen = () => {
  const [postData, setPostData] = useState({});
  const [inputFocus, setInputFocus] = useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let status = await Location.requestForegroundPermissionsAsync();
      } catch (e) {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const navigation = useNavigation();

  const isPostComplete = () => {
    return postData.image &&
      postData.title &&
      postData.location &&
      postData.title.length > 0 &&
      postData.location.length > 0
      ? true
      : false;
  };

  const handleCameraPress = async () => {
    if (cameraRef) {
      try {
        setIsCameraActive(false);

        const { uri } = await cameraRef.takePictureAsync();
        await cameraRef.pausePreview();
        await MediaLibrary.createAssetAsync(uri);

        setPostData({ ...postData, image: uri });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onDeletePhoto = () => {
    setPostData({ ...postData, image: null });
    setIsCameraActive(true);
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
    setIsCameraActive(true);
    setPostData({});
  };

  const onSavePost = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPostData({ ...postData, coords });
    } catch (error) {
      console.error(error);
    }
    const postToAdd = {
      ...postData,
      id: Date.now(),
      userID: "user2",
      likes: 0,
      comments: [],
    };
    posts.push(postToAdd);
    setPostData({});
    navigation.navigate("Posts");
    setIsCameraActive(true);
  };

  const handleInputChange = (field, newText) => {
    setPostData({ ...postData, [field]: newText.trim() });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          {postData.image && (
            <View style={styles.postImgContainer}>
              <Image source={{ uri: postData.image }} style={styles.image} />
              <Pressable
                onPress={onDeletePhoto}
                style={({ pressed }) => [
                  styles.deletePhotoButton,
                  pressed && styles.deletePhotoButtonPressed,
                ]}
              >
                <Feather name="trash-2" size={24} color="#FFFFFF" />
              </Pressable>
            </View>
          )}

          {!postData.image && (
            <Camera
              ref={setCameraRef}
              type={type}
              style={styles.postImgContainer}
            >
              <Pressable
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
                style={({ pressed }) => [
                  styles.cameraFlip,
                  pressed && styles.cameraFlipPressed,
                ]}
              >
                <Feather name="refresh-ccw" size={24} color="#FFFFFF" />
              </Pressable>
              {!isCameraActive && (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator color="#FF6C00" size={"large"} />
                </View>
              )}

              {isCameraActive && (
                <View style={styles.pickImgWrap}>
                  <Pressable
                    onPress={handleCameraPress}
                    style={[
                      styles.pickImg,
                      postData.image && styles.pickImgDimmed,
                    ]}
                  >
                    <FontAwesome5
                      name="camera"
                      size={24}
                      color={postData.image ? "#FFFFFF" : "#BDBDBD"}
                    />
                  </Pressable>
                </View>
              )}
            </Camera>
          )}
          <Text style={styles.grayText}>
            {postData.image ? "Take a new photo" : "Take a photo"}
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
            // disabled={isPostComplete() ? false : true}
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
  loaderContainer: {
    width: 390,
    height: 240,
    zIndex: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  postImgContainer: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  flipContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraFlip: {
    position: "absolute",
    zIndex: 2,
    top: 8,
    right: 8,
  },
  cameraFlipPressed: { backgroundColor: "#f6f6f661", borderRadius: 6 },
  pickImgWrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
  },
  pickImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  pickImgDimmed: { backgroundColor: " rgba(255, 255, 255, 0.30)" },
  image: {
    width: "100%",
    height: "100%",
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
  deletePhotoButton: {
    position: "absolute",
    left: 8,
    top: 8,
    zIndex: 2,
  },
  deletePhotoButtonPressed: { backgroundColor: "#f6f6f661", borderRadius: 8 },
});

export default CreatePostsScreen;
