import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

import BackgroundImg from "../background.png";

const RegistrationScreen = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const [inputFocus, setInputFocus] = useState({
    username: { backgroundColor: "#F6F6F6", borderColor: "#E8E8E8" },
    email: { backgroundColor: "#F6F6F6", borderColor: "#E8E8E8" },
    password: { backgroundColor: "#F6F6F6", borderColor: "#E8E8E8" },
  });

  const managePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const onFocus = (field) => {
    setInputFocus((prevState) => ({
      ...prevState,
      [field]: {
        backgroundColor: "#FFF",
        borderColor: "#FF6C00",
        color: "#212121",
      },
    }));
  };

  const onBlur = (field) => {
    setInputFocus((prevState) => ({
      ...prevState,
      [field]: { backgroundColor: "#F6F6F6", borderColor: "#E8E8E8" },
    }));
  };

  return (
    <ImageBackground source={BackgroundImg} style={styles.image}>
      <KeyboardAvoidingView
        behavior={"height"}
        keyboardVerticalOffset={-210}
        style={styles.containerKeyBoard}
      >
        <View style={styles.container}>
          <View style={styles.regWrap}>
            <View>
              <Text style={styles.formHeader}>{"Login"}</Text>
              <TextInput
                placeholder="Email"
                inputMode="email"
                placeholderTextColor={"#BDBDBD"}
                style={[styles.input, inputFocus.email]}
                onFocus={() => onFocus("email")}
                onBlur={() => onBlur("email")}
              ></TextInput>
              <View>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={hidePassword}
                  placeholderTextColor={"#BDBDBD"}
                  style={[styles.input, inputFocus.password]}
                  onFocus={() => onFocus("password")}
                  onBlur={() => onBlur("password")}
                ></TextInput>
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
              </View>
              <Pressable style={styles.primaryBtn}>
                <Text style={styles.btnText}>{"Sign in"}</Text>
              </Pressable>
              <View style={styles.secTxtWrap}>
                <Text style={styles.secText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => console.log("go to sing up screen function")}
                >
                  <Text style={[styles.secText, styles.underlined]}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { height: "100%", width: "100%", justifyContent: "flex-end" },
  containerKeyBoard: { justifyContent: "flex-end" },
  regWrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: 16,
    paddingRight: 16,
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
  activeInput: {
    backgroundColor: "#FFF",
    height: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    color: "#212121",
    fontSize: 16,
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
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    backgroundColor: "#FF6C00",
    height: 51,
  },
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
    textDecorationLine: "underline ",
  },
  hideBtnText: { color: "#1B4371", fontSize: 16 },
});

export default RegistrationScreen;
