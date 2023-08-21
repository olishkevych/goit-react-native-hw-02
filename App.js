import React from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import RegistrationScreen from "./assets/Screens/RegistrationScreen";
import LoginScreen from "./assets/Screens/LoginScreen";
import { View } from "react-native";

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Medium.ttf"),
  });
  return (
    <View style={styles.container}>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default App;
