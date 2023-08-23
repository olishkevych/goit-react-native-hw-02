import React from "react";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import { View } from "react-native";

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Medium.ttf"),
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
