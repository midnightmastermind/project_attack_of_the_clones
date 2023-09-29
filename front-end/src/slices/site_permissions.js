/**
 * This code imports the createSlice, createAsyncThunk, and setMessage functions from the @reduxjs/toolkit and site_permissions.service files.
 * It then uses these functions to create thunks for getting, creating, and updating site permissions, as well as removing all site permissions.
 * 
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import SitePermissionsService from "../services/site_permissions.service";

export const get = createAsyncThunk(
  "site_permissions/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await SitePermissionsService.get(id);
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
  "site_permissions/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await SitePermissionsService.getAll();
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
    "site_permissions/create",
    async (data, thunkAPI) => {
      try {
        const response = await SitePermissionsService.create(data);
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
    "site_permissions/update",
    async ({ id, data }, thunkAPI) => {
      try {
        const response = await SitePermissionsService.update(id, data);
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
//     "site_permissions/remove",
//     async ({ id }, thunkAPI) => {
//       try {
//         const response = await SitePermissionsService.remove(id);
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
// "site_permissions/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await SitePermissionsService.removeAll();
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

const sitePermissionsSlice = createSlice({
    name: "site_permissions",
    initialState,
    extraReducers: {
      [getAll.fulfilled]: (state, action) => {
        state.site_permissions = action.payload;
      },
      [getAll.rejected]: (state, action) => {
        state.site_permissions = {};
      },
    },
  });
const { reducer } = sitePermissionsSlice;
export default reducer;