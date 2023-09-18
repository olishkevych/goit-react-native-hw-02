import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/operations";

import { Feather } from "@expo/vector-icons";
import { selectIsAuthorized } from "../redux/selectors";
import { useEffect } from "react";

const HeaderNav = ({ title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectIsAuthorized);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login", {
      screen: "BottomNav",
    });
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTxt}>{title}</Text>
      {title === "Posts" && (
        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logout,
            pressed && styles.logoutPressed,
          ]}
        >
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </Pressable>
      )}
      {(title === "New Post" || title === "Comments" || title === "Map") && (
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.goBack,
            pressed && styles.goBackPressed,
          ]}
        >
          <Feather name="arrow-left" size={24} color="#212121CC" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    paddingBottom: 11,
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 1,
    backgroundColor: "white",
  },
  headerTxt: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  logout: {
    position: "absolute",
    bottom: 11,
    right: 10,
  },
  logoutPressed: {
    backgroundColor: "#FF6C00",
    borderRadius: 8,
  },
  goBack: { position: "absolute", left: 16, bottom: 10 },
});

export default HeaderNav;
