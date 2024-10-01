import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    initUsers(state, action) {
      return action.payload;
    },
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const initializeLogin = () => {
  return (dispacth) => {
    const loggerUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON);
      blogService.setToken(user.token);
      dispacth(initUsers(user));
    } else {
      return dispacth(initUsers(null));
    }
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(data);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(login(user));
      dispatch(setNotification(`${user.name} logged in`, "success"));
    } catch (error) {
      dispatch(setNotification(`Wrong username or password`, "danger"));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogUser");
    blogService.setToken(null);
    dispatch(logout(null));
  };
};

export const { login, logout, initUsers } = loginSlice.actions;
export default loginSlice.reducer;
