import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

import {
  selectDisplayName,
  selectPhotoURL,
  selectPosts,
} from "../redux/selectors";
import { logout, uploadNewAvatar } from "../redux/operations";
import getBlobFromUri from "../helpers/getBlobFromUri";
import manageFileUpload from "../helpers/manageFileUpload";

import BackgroundImg from "../img/background.png";
import userPic from "../img/userPic.jpg";

const ProfileHeader = () => {
  const [image, setImage] = useState(null);
  const displayName = useSelector(selectDisplayName);
  const photoURL = useSelector(selectPhotoURL);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await handleCloudImageUpload(result.assets[0].uri);
    }
  };

  const handleCloudImageUpload = async (uploadedImg) => {
    const blob = await getBlobFromUri(uploadedImg);
    manageFileUpload(blob, onImageUploadComplete);
  };

  const onImageUploadComplete = async (imgURL) => {
    dispatch(uploadNewAvatar(imgURL));
  };

  const removeImage = () => {
    setImage(null);
    dispatch(uploadNewAvatar(null));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.profileHeaderWrap}>
      <ImageBackground
        source={BackgroundImg}
        resizeMode="cover"
        style={styles.background}
      ></ImageBackground>
      <View style={styles.contentWrap}>
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logout,
            pressed && styles.logoutPressed,
          ]}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </Pressable>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Image
              source={
                image ? { uri: image } : photoURL ? { uri: photoURL } : userPic
              }
              style={styles.avatar}
            />
          </View>
          {image || photoURL ? (
            <Pressable
              onPress={removeImage}
              style={({ pressed }) => [
                styles.avatarBtn,
                pressed && styles.avatarBtnPressed,
              ]}
            >
              <View style={styles.svgContainer}>
                <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={pickImage}
              style={({ pressed }) => [
                styles.avatarBtn,
                pressed && styles.avatarBtnPressed,
              ]}
            >
              <View style={styles.svgContainer}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </View>
            </Pressable>
          )}
        </View>
        <Text style={styles.username}>{displayName}</Text>
      </View>

      {posts.length === 0 && (
        <Text style={styles.noPosts}>Your posts will be shown here</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeaderWrap: { overflow: "hidden", paddingTop: 147 },
  background: {
    width: "100%",
    position: "absolute",
    height: 812,
    top: 0,
  },
  avatar: {
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarWrap: {
    position: "absolute",
    flex: 1,
    zIndex: 2,
    top: -60,
    alignSelf: "center",
  },
  avatarBtn: {
    position: "absolute",
    zIndex: 3,
    top: 81,
    right: -12.5,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  avatarBtnPressed: {
    backgroundColor: "#F6F6F6",
  },
  svgContainer: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    position: "absolute",
    zIndex: 3,
    right: 16,
    top: 22,
  },
  logoutPressed: {
    backgroundColor: "#FF6C00",
    borderRadius: 8,
  },
  username: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
    paddingBottom: 15,
    color: "#212121",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  noPosts: {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },
});

export default ProfileHeader;
