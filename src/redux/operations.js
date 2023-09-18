import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...postData,
      });
      const snapshot = await getDocs(collection(db, "posts"));
      const allPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        image: doc.data().image,
        title: doc.data().title,
        coords: doc.data().coords,
        comments: doc.data().comments,
        likes: doc.data().likes,
        userID: doc.data().userID,
        locationName: doc.data().locationName,
      }));
      const posts = allPosts.filter((post) => post.userID === postData.userID);
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (uid, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const allPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        image: doc.data().image,
        title: doc.data().title,
        coords: doc.data().coords,
        comments: doc.data().comments,
        likes: doc.data().likes,
        userID: doc.data().userID,
        locationName: doc.data().locationName,
      }));
      const posts = allPosts.filter((post) => post.userID === uid);
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ comment, postID }, thunkAPI) => {
    try {
      const postRef = doc(db, "posts", postID);
      await updateDoc(postRef, { comments: arrayUnion(comment) });

      const querySnapshot = await getDoc(postRef);
      if (querySnapshot.exists()) {
        return { comments: querySnapshot.data().comments, postID };
      } else {
        throw new Error("Something went wrong. Post not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ email, password, displayName, photoURL }, thunkAPI) => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      const user = auth.currentUser;

      return {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        return thunkAPI.rejectWithValue("Invalid email");
      }
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        return thunkAPI.rejectWithValue("Email already in use!");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const uploadNewAvatar = createAsyncThunk(
  "user/uploadNewAvatar",
  async (photoURL, thunkAPI) => {
    const auth = getAuth();
    try {
      if (photoURL) {
        await updateProfile(auth.currentUser, {
          photoURL,
        });
      }
      if (!photoURL) {
        await updateProfile(auth.currentUser, {
          photoURL: "",
        });
      }

      const user = auth.currentUser;
      return {
        photoURL: user.photoURL,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user.email);
      return {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Please check your email and password");
    }
  }
);

export const resetAuthError = createAsyncThunk(
  "user/resetAuthError",
  async (_, thunkAPI) => {
    try {
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
