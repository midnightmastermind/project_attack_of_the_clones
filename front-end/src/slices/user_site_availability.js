/**
 * This code imports the createSlice, createAsyncThunk, and setMessage functions from the reduxjs/toolkit and user_site_availability.service files.
 * It then uses these functions to create thunks for getting, creating, updating, and removing user site availability data.
 * 
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import CourseService from "../services/user_site_availability.service";

export const get = createAsyncThunk(
  "user_site_availability/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await CourseService.get(id);
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
  "user_site_availability/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await CourseService.getAll();
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
    "user_site_availability/create",
    async (data, thunkAPI) => {
      try {
        const response = await CourseService.create(data);
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
    "user_site_availability/update",
    async ({ id, data }, thunkAPI) => {
      try {
        const response = await CourseService.update(id, data);
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

  export const remove = createAsyncThunk(
    "user_site_availability/remove",
    async ({ id }, thunkAPI) => {
      try {
        const response = await CourseService.remove(id);
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

// export const removeAll = createAsyncThunk(
// "user_site_availability/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await CourseService.removeAll();
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

const userSiteAvailabilitySlice = createSlice({
    name: "user_site_availability",
    initialState,
    extraReducers: {
      [getAll.fulfilled]: (state, action) => {
        state.user_site_availability = action.payload;
      },
      [getAll.rejected]: (state, action) => {
        state.user_site_availability = {};
      },
    },
  });
const { reducer } = userSiteAvailabilitySlice;
export default reducer;