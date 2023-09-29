/**
 * This code imports the createSlice function from the @reduxjs/toolkit library, then defines an initial state object and creates a messageSlice slice with a name of "message", the initialState object as its initial state, and setMessage and clearMessage reducers.
 * The code then exports the set
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer;