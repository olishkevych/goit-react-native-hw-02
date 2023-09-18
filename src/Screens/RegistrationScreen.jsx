import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { register } from "../redux/operations";

import manageFileUpload from "../helpers/manageFileUpload";
import getBlobFromUri from "../helpers/getBlobFromUri";

import { AntDesign } from "@expo/vector-icons";
import BackgroundImg from "../img/background.png";

const RegistrationScreen = () => {
  const [image, setImage] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [inputFocus, setInputFocus] = useState({});
  const [userData, setUserData] = useState({});
  const [showEmailError, setShowEmailError] = useState(null);
  const [showPasswordError, setShowPasswordError] = useState(null);
  const [showUsernameError, setShowUsernameError] = useState(null);
  const [regError, setRegError] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthorized) {
      navigation.navigate("BottomNav", { screen: "Posts" });
    }
  }, [isAuthorized]);

  const managePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleInputChange = (field, newText) => {
    setUserData({ ...userData, [field]: newText });
    if (field === "email") {
      setShowEmailError(null);
    }
    if (field === "password") {
      setShowPasswordError(null);
    }
    if (field === "displayName") {
      setShowUsernameError(null);
    }
  };

  const verifyUserdata = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (emailRegex.test(userData.email)) {
      setShowEmailError(null);
    }

    if (!userData.displayName || userData.displayName.length === 0) {
      setShowUsernameError("Fill in your username");
      return false;
    }

    if (userData.displayName && userData.displayName.length === 0) {
      setShowUsernameError(null);
      return false;
    }

    if (!userData.email || userData.email.length === 0) {
      setShowEmailError("Fill in your email");
      return false;
    }

    if (!emailRegex.test(userData.email)) {
      setShowEmailError("Please enter a valid email address");
      return false;
    }

    if (!userData.password) {
      setShowPasswordError("Fill in your password");
      return false;
    }

    if (userData.password.length < 8) {
      setShowPasswordError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSignUpClick = () => {
    const isUserdataValid = verifyUserdata();
    setRegError(null);
    if (isUserdataValid) {
      if (image) {
        handleCloudImageUpload();
        return;
      } else {
        dispatchRegister(userData);
      }
    }
  };

  const dispatchRegister = (userData) =>
    dispatch(register(userData))
      .then((action) => {
        if (action.error) {
          throw new Error(action.payload);
        }
        if (!action.error) {
          setUserData({});
          setRegError(null);
          setIsAuthorized(true);
        }
      })
      .catch((error) => setRegError(error));

  const handleCloudImageUpload = async () => {
    const blob = await getBlobFromUri(image);
    manageFileUpload(blob, onImageUploadComplete);
  };

  const onImageUploadComplete = async (imgURL) => {
    const newUser = {
      ...userData,
      photoURL: imgURL,
    };
    dispatchRegister(newUser);
  };

  const onFocus = (field) => {
    setInputFocus((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const onBlur = (field) => {
    if (field === "password") {
      setHidePassword(true);
    }
    setInputFocus((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-147}
        style={styles.container}
      >
        <ImageBackground
          source={BackgroundImg}
          style={styles.background}
          resizeMethod="resize"
        >
          <View style={styles.container}>
            <View style={styles.regWrap}>
              <View style={styles.avatarWrap}>
                <View style={styles.avatar}>
                  {image && (
                    <Image source={{ uri: image }} style={styles.avatar} />
                  )}
                </View>
                {image ? (
                  <Pressable
                    onPress={removeImage}
                    style={({ pressed }) => [
                      styles.avatarBtn,
                      pressed && styles.avatarBtnPressed,
                    ]}
                  >
                    <View style={styles.svgContainer}>
                      <AntDesign
                        name="closecircleo"
                        size={25}
                        color="#BDBDBD"
                      />
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
              <View>
                <Text style={styles.formHeader}>{"Create an account"}</Text>
                <View>
                  <View>
                    <TextInput
                      placeholder="Username"
                      placeholderTextColor={"#BDBDBD"}
                      style={[
                        styles.input,
                        inputFocus.displayName && styles.focusedInput,
                      ]}
                      onFocus={() => onFocus("displayName")}
                      onBlur={() => onBlur("displayName")}
                      onChangeText={(text) =>
                        handleInputChange("displayName", text)
                      }
                      defaultValue={userData.displayName}
                    ></TextInput>
                    {showUsernameError && (
                      <Text style={styles.fieldError}>{showUsernameError}</Text>
                    )}
                  </View>
                </View>
                <View>
                  <TextInput
                    placeholder="Email"
                    inputMode="email"
                    placeholderTextColor={"#BDBDBD"}
                    style={[
                      styles.input,
                      inputFocus.email && styles.focusedInput,
                    ]}
                    onFocus={() => onFocus("email")}
                    onBlur={() => onBlur("email")}
                    onChangeText={(text) => handleInputChange("email", text)}
                    defaultValue={userData.email}
                  ></TextInput>
                  {showEmailError && (
                    <Text style={styles.fieldError}>{showEmailError}</Text>
                  )}
                </View>
                <View>
                  <View>
                    <TextInput
                      placeholder="Password"
                      secureTextEntry={hidePassword}
                      placeholderTextColor={"#BDBDBD"}
                      style={[
                        styles.input,
                        inputFocus.password && styles.focusedInput,
                      ]}
                      onFocus={() => onFocus("password")}
                      onBlur={() => onBlur("password")}
                      onChangeText={(text) =>
                        handleInputChange("password", text)
                      }
                      defaultValue={userData.password}
                    ></TextInput>
                    {showPasswordError && (
                      <Text style={styles.fieldError}>{showPasswordError}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => managePasswordVisibility()}
                    style={styles.hideBtn}
                  >
                    <Text style={styles.hideBtnText}>
                      {hidePassword ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {regError && (
                    <Text style={styles.registerError}>{regError.message}</Text>
                  )}
                  <Pressable
                    onPress={handleSignUpClick}
                    style={({ pressed }) => [
                      styles.primaryBtn,
                      pressed && styles.primaryBtnPressed,
                    ]}
                  >
                    <Text style={styles.btnText}>{"Sign up"}</Text>
                  </Pressable>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.secTxtWrap}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.secText}>
                      Already have an account?{" "}
                    </Text>
                    <Text style={[styles.secText, styles.underlined]}>
                      Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  regWrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 78,
  },
  background: {
    bottom: 0,
    top: 0,
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
  },

  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },

  focusedInput: { borderColor: "#FF6C00", backgroundColor: "#FFFFFF" },

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
    top: 76,
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
  formHeader: {
    fontSize: 30,
    letterSpacing: 0.3,
    textAlign: "center",
    color: "#212121",
    fontFamily: "Roboto",
    fontWeight: "500",
    marginBottom: 33,
  },
  primaryBtn: {
    marginTop: 27,
    marginBottom: 16,
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "#FF6C00",
    height: 51,
  },
  primaryBtnPressed: { backgroundColor: "#ff6a00ab" },
  btnText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
  secTxtWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  secText: {
    fontSize: 16,
    color: "#1B4371",
  },
  hideBtn: {
    position: "absolute",
    right: 16,
    top: 12,
  },
  underlined: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#1B4371",
  },
  hideBtnText: { color: "#1B4371", fontSize: 16 },
  fieldError: {
    color: "red",
    fontSize: 14,
    position: "absolute",
    left: 10,
    top: -17,
  },
  registerError: {
    color: "red",
    fontSize: 16,
    position: "absolute",
    width: "100%",
    textAlign: "center",
  },
});

export default RegistrationScreen;
