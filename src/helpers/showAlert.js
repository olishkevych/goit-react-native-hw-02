import { Alert } from "react-native";

export const showAlert = (message) =>
  Alert.alert(
    "Error",
    message,
    [
      {
        text: "OK",
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
