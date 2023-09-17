import React from "react";
import "react-native-gesture-handler";
import { View, Text } from "react-native";
import RootNav from "./src/routes/RootNav";

import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("./src/assets/fonts/Roboto-Medium.ttf"),
  });
  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <View style={styles.container}>
          <NavigationContainer>
            <RootNav />
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
});
export default App;
