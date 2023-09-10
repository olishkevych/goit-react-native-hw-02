import React from "react";
import "react-native-gesture-handler";
import { View } from "react-native";
import RootNav from "./src/routes/RootNav";
import BottomNav from "./src/routes/BottomNav";

import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Medium.ttf"),
  });
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
});

export default App;
