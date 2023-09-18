import { createSlice } from "@reduxjs/toolkit";
import { addPost, getPosts, addComment } from "../operations";

const initialState = {
  posts: [],
  error: null,
  isLoading: false,
};

const postsReducer = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(getPosts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        const { comments, postID } = payload;
        state.error = null;
        state.isLoading = true;
        const updatedPost = state.posts.find((post) => post.id === postID);
        updatedPost.comments = comments;
      })
      .addCase(addComment.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export default postsReducer.reducer;
