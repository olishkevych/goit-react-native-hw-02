import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { coords } = route.params;

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        style={styles.mapStyle}
      >
        <Marker
          title="Selected Location"
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
