import { createSlice } from "@reduxjs/toolkit";
import { addPost, addComment, getAllPosts, handleLike } from "../operations";

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
      .addCase(getAllPosts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
        state.error = null;
      })
      .addCase(getAllPosts.rejected, (state, { payload }) => {
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
      })
      .addCase(handleLike.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(handleLike.fulfilled, (state, { payload }) => {
        const { likes, postID } = payload;
        state.error = null;
        state.isLoading = true;
        const updatedPost = state.posts.find((post) => post.id === postID);
        updatedPost.likes = likes;
      })
      .addCase(handleLike.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export default postsReducer.reducer;
