import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";

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
  ActivityIndicator,
} from "react-native";

import { addPost } from "../redux/operations";
import manageFileUpload from "../helpers/manageFileUpload";
import getBlobFromUri from "../helpers/getBlobFromUri";
import { selectUID } from "../redux/selectors";

import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [postData, setPostData] = useState({});
  const [imgURI, setImgURI] = useState(null);
  const [inputFocus, setInputFocus] = useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const uid = useSelector(selectUID);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let status = await Location.requestForegroundPermissionsAsync();
      } catch (e) {}
    })();
  }, []);

  const isPostComplete = () => {
    return imgURI &&
      postData.title &&
      postData.locationName &&
      postData.title.length > 0 &&
      postData.locationName.length > 0
      ? true
      : false;
  };

  const handleCloudImageUpload = async () => {
    const blob = await getBlobFromUri(imgURI);
    manageFileUpload(blob, onImageUploadComplete);
  };

  const onImageUploadComplete = async (imgURL) => {
    const coords = await getLocation();
    const postToAdd = {
      ...postData,
      coords,
      userID: uid,
      likes: 0,
      comments: [],
      image: imgURL,
    };
    dispatch(addPost(postToAdd));
  };

  const handleCameraPress = async () => {
    if (cameraRef) {
      try {
        setIsCameraActive(false);
        const { uri } = await cameraRef.takePictureAsync();
        await cameraRef.pausePreview();
        await MediaLibrary.createAssetAsync(uri);
        setImgURI(uri);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      return coords;
    } catch (error) {
      console.log(error);
    }
  };

  const onSavePost = async () => {
    await handleCloudImageUpload();
    setPostData({});
    setImgURI(null);
    navigation.navigate("Posts");
    setIsCameraActive(true);
  };

  const onDeletePhoto = () => {
    setImgURI(null);
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
    setImgURI(null);
  };

  const handleInputChange = (field, newText) => {
    setPostData({ ...postData, [field]: newText.trim() });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          {imgURI && (
            <View style={styles.postImgContainer}>
              <Image source={{ uri: imgURI }} style={styles.image} />
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

          {!imgURI && (
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
            {imgURI ? "Take a new photo" : "Take a photo"}
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
                inputFocus.locationName && styles.focusedInput,
              ]}
              onFocus={() => onFocus("locationName")}
              onBlur={() => onBlur("locationName")}
              onChangeText={(text) => handleInputChange("locationName", text)}
              defaultValue={postData.locationName}
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
              style={[styles.btnText, isPostComplete() && styles.btnTextActive]}
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
