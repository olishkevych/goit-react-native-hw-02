import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  uploadNewAvatar,
  resetAuthError,
} from "../operations";

const initialState = {
  displayName: null,
  email: null,
  photoURL: null,
  uid: null,
  isAuthorized: false,
  authError: null,
  isLoading: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.authError = null;
        state.isLoading = true;
        state.isAuthorized = false;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        const { email, displayName, photoURL, uid } = payload;
        state.email = email;
        state.displayName = displayName;
        state.photoURL = photoURL;
        state.uid = uid;
        state.authError = null;
        state.isAuthorized = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.authError = payload;
        state.isAuthorized = false;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.authError = null;
        state.isLoading = true;
        state.isAuthorized = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { email, displayName, uid, photoURL } = payload;
        state.uid = uid;
        state.displayName = displayName;
        state.email = email;
        state.photoURL = photoURL;
        state.authError = null;
        state.isAuthorized = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.authError = payload;
        state.isAuthorized = false;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.authError = null;
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.uid = null;
        state.displayName = null;
        state.email = null;
        state.photoURL = null;
        state.authError = null;
        state.isAuthorized = false;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.authError = payload;
        state.uid = null;
        state.displayName = null;
        state.email = null;
        state.photoURL = null;
        state.isAuthorized = true;
        state.isLoading = false;
      })
      .addCase(uploadNewAvatar.pending, (state) => {
        state.authError = null;
        state.isLoading = true;
      })
      .addCase(uploadNewAvatar.fulfilled, (state, { payload }) => {
        state.photoURL = payload.photoURL;
        state.authError = null;
        state.isLoading = false;
      })
      .addCase(uploadNewAvatar.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.authError = payload;
      })
      .addCase(resetAuthError.pending, (state) => {
        state.authError = null;
      })
      .addCase(resetAuthError.fulfilled, (state) => {
        state.authError = null;
      })
      .addCase(resetAuthError.rejected, (state) => {
        state.authError = null;
      });
  },
});

export default userReducer.reducer;
