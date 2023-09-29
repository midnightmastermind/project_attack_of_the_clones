/**
 * This code imports the createSlice, createAsyncThunk, and setMessage functions from the @reduxjs/toolkit and course_permissions.service files.
 * It then sets up the get, getAll, getAllForUser, getAllForSite, create, update, and remove functions
 */


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import CoursePermissionsService from "../services/course_permissions.service";

export const get = createAsyncThunk(
  "course_permissions/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await CoursePermissionsService.get(id);
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
  "course_permissions/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await CoursePermissionsService.getAll();
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

export const getAllForUser = createAsyncThunk(
    "course_permissions/getAllForUser",
    async (_, thunkAPI) => {
      try {
        const response = await CoursePermissionsService.getAllForUser();
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

  export const getAllForSite = createAsyncThunk(
    "course_permissions/getAllForSite",
    async (_, thunkAPI) => {
      try {
        const response = await CoursePermissionsService.getAllForSite();
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
    "course_permissions/create",
    async (data, thunkAPI) => {
      try {
        const response = await CoursePermissionsService.create(data);
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
    "course_permissions/update",
    async ({ id, data }, thunkAPI) => {
      try {
        const response = await CoursePermissionsService.update(id, data);
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
//     "course_permissions/remove",
//     async ({ id }, thunkAPI) => {
//       try {
//         const response = await CoursePermissionsService.remove(id);
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
// "course_permissions/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await CoursePermissionsService.removeAll();
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

const initialState = {};

const coursePermissionsSlice = createSlice({
    name: "course_permissions",
    initialState,
    extraReducers: {
      [getAll.fulfilled]: (state, action) => {
        state.course_permissions = action.payload;
      },
      [getAll.rejected]: (state, action) => {
        state.course_permissions = [];
      },
      [getAllForSite.fulfilled]: (state, action) => {
        state.course_permissions = action.payload;
      },
      [getAllForSite.rejected]: (state, action) => {
        state.course_permissions = [];
      },
      [getAllForUser.fulfilled]: (state, action) => {
        state.course_permissions = action.payload;
      },
      [getAllForUser.rejected]: (state, action) => {
        state.course_permissions = [];
      },
    },
  });
const { reducer } = coursePermissionsSlice;
export default reducer;