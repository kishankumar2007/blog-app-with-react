import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userPosts: [],
    allPosts: [],

}
const postSlice = createSlice(
    {
        name: "postSlice",
        initialState,
        reducers: {
            addPost: (state, action) => {
                state.userPosts = action.payload
                state.allPosts = action.payload.addPost
            },

            deletePost: (state, action) => {
                state.userPosts = action.payload
                state.allPosts = action.payload.deletePost
            },
            setallPosts: (state, action) => {
                state.allPosts = [...action.payload]
            }

        }
    }

)
export const { setallPosts, addPost, deletePost } = postSlice.actions

export default postSlice.reducer