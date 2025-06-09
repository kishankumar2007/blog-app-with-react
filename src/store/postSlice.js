import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: []
};
const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    deletePost: (state, action) => {
      state.allPosts = state.allPosts.filter(
        (post) => post.$id !== action.payload
      );
    },
    setallPosts: (state, action) => {
      state.allPosts = [...action.payload].reverse();
    }
  },
});
export const { setallPosts, addPost, deletePost} = postSlice.actions;

export default postSlice.reducer;
