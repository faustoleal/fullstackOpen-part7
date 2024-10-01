import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    vote(state, action) {
      const id = action.payload.id;
      const blogToLike = state.find((b) => b.id === id);
      const changedBlog = {
        ...blogToLike,
        likes: action.payload.likes,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    comments(state, action) {
      const id = action.payload.id;
      const blogToComment = state.find((b) => b.id === id);
      const changedBlog = {
        ...blogToComment,
        comments: action.payload.comments,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    deleted(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
    dispatch(setNotification(`a new blog: ${newBlog.title} added`, "success"));
  };
};

export const votedBlog = (blogToUpdate) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update({
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    });
    dispatch(vote(updatedBlog));
  };
};

export const commentBlog = (comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment({
      ...comment,
    });
    dispatch(comments(commentedBlog));
  };
};

export const removeBlog = (blogToDelete) => {
  return async (dispatch) => {
    await blogService.remove(blogToDelete.id);
    dispatch(deleted(blogToDelete.id));
    dispatch(setNotification(`Delete ${blogToDelete.title}`, "success"));
  };
};

export const { appendBlog, setBlogs, vote, deleted, comments } =
  blogSlice.actions;
export default blogSlice.reducer;
