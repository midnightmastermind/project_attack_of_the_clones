/**
 * This code contains functions for retrieving, creating, and updating session data, as well as a reducer to handle this data.
 * The initial state is an empty object.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import SessionService from "../services/session.service";

export const get = createAsyncThunk(
  "session/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await SessionService.get(id);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAll = createAsyncThunk(
  "session/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await SessionService.getAll();
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const create = createAsyncThunk(
    "session/create",
    async (data, thunkAPI) => {
      try {
        const response = await SessionService.create(data);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );
  
  export const update = createAsyncThunk(
    "session/update",
    async ({id, data}, thunkAPI) => {
      try {
        console.log(id);
        console.log(data);
        console.log(thunkAPI);
        const response = await SessionService.update(id, data);
        return response.data;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
  );

//   export const remove = createAsyncThunk(
//     "session/remove",
//     async ({ id }, thunkAPI) => {
//       try {
//         const response = await SessionService.remove(id);
//         thunkAPI.dispatch(setMessage(response.data.message));
//         return response.data;
//       } catch (error) {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         thunkAPI.dispatch(setMessage(message));
//         return thunkAPI.rejectWithValue();
//       }
//     }
//   );

// export const removeAll = createAsyncThunk(
// "session/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await SessionService.removeAll();
//     thunkAPI.dispatch(setMessage(response.data.message));
//     return response.data;
//     } catch (error) {
//     const message =
//         (error.response &&
//         error.response.data &&
//         error.response.data.message) ||
//         error.message ||
//         error.toString();
//     thunkAPI.dispatch(setMessage(message));
//     return thunkAPI.rejectWithValue();
//     }
// }
// );

const initialState = { };

const sessionSlice = createSlice({
    name: "session",
    initialState,
    extraReducers: {
      [getAll.fulfilled]: (state, action) => {
        state.sessions = action.payload;
      },
      [getAll.rejected]: (state, action) => {
        state.sessions = [];
      },
    },
  });
const { reducer } = sessionSlice;
export default reducer;