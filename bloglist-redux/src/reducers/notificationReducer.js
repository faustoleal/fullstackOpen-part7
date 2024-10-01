import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return action.payload;
    },
  },
});

export const setNotification = (message, type) => {
  return (dispatch) => {
    dispatch(showNotification({ message, type }));
    setTimeout(() => {
      dispatch(hideNotification(null));
    }, 3000);
  };
};

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
