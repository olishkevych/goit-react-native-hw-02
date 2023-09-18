import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { login, resetAuthError } from "../redux/operations";
import { selectAuthError, selectIsAuthorized } from "../redux/selectors";
import { showAlert } from "../helpers/showAlert";

import BackgroundImg from "../img/background.png";

const LoginScreen = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [userData, setUserData] = useState({});
  const [showLoginError, setShowLoginError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(null);
  const [showPasswordError, setShowPasswordError] = useState(null);
  const [inputFocus, setInputFocus] = useState({});
  const authError = useSelector(selectAuthError);
  const isAuthorized = useSelector(selectIsAuthorized);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const managePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const verifyLogin = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!userData.email || userData.email.length === 0) {
      setShowEmailError("Fill in your email");
      return false;
    }

    if (!emailRegex.test(userData.email)) {
      setShowEmailError("Please enter a valid email address");
      return false;
    }
    if (emailRegex.test(userData.email)) {
      setShowEmailError(null);
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

  const handleLoginClick = () => {
    const isLoginValid = verifyLogin();

    if (isLoginValid) {
      dispatch(login(userData));

      if (!authError) {
        setUserData({});
        navigation.navigate("BottomNav", { screen: "Posts" });
      }

      if (authError) {
        setShowLoginError(true);
        return;
      }
    }
  };

  const handleInputChange = (field, newText) => {
    setUserData({ ...userData, [field]: newText });
    field === "email" ? setShowEmailError(null) : setShowPasswordError(null);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-90}
        style={styles.container}
      >
        <ImageBackground
          source={BackgroundImg}
          style={styles.background}
          resizeMethod="resize"
        >
          <View style={styles.container}>
            <View style={styles.regWrap}>
              <View>
                <Text style={styles.formHeader}>{"Login"}</Text>
                <View>
                  <TextInput
                    placeholder="Email"
                    inputMode="email"
                    placeholderTextColor="#BDBDBD"
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
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={hidePassword}
                    placeholderTextColor="#BDBDBD"
                    style={[
                      styles.input,
                      inputFocus.password && styles.focusedInput,
                    ]}
                    onFocus={() => onFocus("password")}
                    onBlur={() => onBlur("password")}
                    onChangeText={(text) => handleInputChange("password", text)}
                    defaultValue={userData.password}
                  ></TextInput>
                  {showPasswordError && (
                    <Text style={styles.passwordError}>
                      {showPasswordError}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => managePasswordVisibility()}
                    style={styles.hideBtn}
                  >
                    {hidePassword ? (
                      <Text style={styles.hideBtnText}>Show</Text>
                    ) : (
                      <Text style={styles.hideBtnText}>Hide</Text>
                    )}
                  </TouchableOpacity>
                  {showLoginError && !showEmailError && !showPasswordError && (
                    <Text style={styles.loginError}>{authError}</Text>
                  )}
                </View>
                <Pressable
                  onPress={handleLoginClick}
                  style={({ pressed }) => [
                    styles.primaryBtn,
                    pressed && styles.primaryBtnPressed,
                  ]}
                >
                  <Text style={styles.btnText}>{"Sign in"}</Text>
                </Pressable>
                <View>
                  <TouchableOpacity
                    style={styles.secTxtWrap}
                    onPress={() => {
                      setUserData({});
                      setShowEmailError(null);
                      setShowPasswordError(null);
                      setShowLoginError(false);
                      navigation.navigate("Registration");
                    }}
                  >
                    <Text style={styles.secText}>Don't have an account? </Text>
                    <Text style={[styles.secText, styles.underlined]}>
                      Sign up
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
  container: { height: "100%", width: "100%", justifyContent: "flex-end" },

  background: {
    bottom: 0,
    top: 0,
    flex: 1,
    width: "100%",
  },
  regWrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 132,
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
    position: "absolute",
    color: "red",
    left: 10,
    top: -15,
    fontSize: 12,
  },
  passwordError: {
    position: "absolute",
    color: "red",
    left: 10,
    fontSize: 12,
    top: -15,
  },
  loginError: {
    position: "absolute",
    color: "red",
    fontSize: 14,
    bottom: -15,
    width: "100%",

    textAlign: "center",
  },
});

export default LoginScreen;
