import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
});

// add new posts
export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", postData);
    return response.data;
});

// delete post 
export const deletePost = createAsyncThunk("posts/deletePost", async (postId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return postId;
});

//fetch one post
export const fetchPostDetails = createAsyncThunk("posts/fetchPostDetails", async (id) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return response.data;
});

// update post 
export const updatePost = createAsyncThunk("posts/updatePost", async ({id, updatedData}) => {
  const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedData);
  return response.data;
});