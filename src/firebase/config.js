import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzkWumUjVDsI0zvDGYF2VzS-uE8AdJi_4",
  authDomain: "react-native-project-398819.firebaseapp.com",
  projectId: "react-native-project-398819",
  storageBucket: "react-native-project-398819.appspot.com",
  messagingSenderId: "1016438994680",
  appId: "1:1016438994680:web:733a3f5b969743a4b8ed0d",
  measurementId: "G-MDQ879H2DW",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
