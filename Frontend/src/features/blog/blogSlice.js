// blogSlice.js - Redux slice for managing blog-related state (fetching, updating, and deleting blogs).
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  getBlogs } from './blogAPI';

// Initial state for the blog slice, includes loading and error states
const initialState = {
  blogs: [],
  loading: false,
  error: null,
  clickedBlogId: null,
};

// Thunk action to fetch all blogs with optional filters
export const fetchBlogs = createAsyncThunk('blogs/fetchAll', async (filters) => {
  const res = await getBlogs(filters || {});
  return res.data;
});

// Reducer slice for handling blog-related state changes
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setClickedBlogId: (state, action) => {
      state.clickedBlogId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      // Handle successful blog fetch response
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      // Handle fetch blogs failure
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export action to set clicked blog ID
export const { setClickedBlogId } = blogSlice.actions;

export default blogSlice.reducer;
