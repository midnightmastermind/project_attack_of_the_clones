/**
 * This code contains functions for creating, updating, and removing attendance data.
 * It also includes a function for getting all attendance data.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AttendanceService from "../services/attendance.service";

export const get = createAsyncThunk(
  "attendance/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await AttendanceService.get(id);
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
  "attendance/getAll",
  async ({ }, thunkAPI) => {
    try {
      const data = await AttendanceService.getAll();
      return { user: data };
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
    "attendance/create",
    async (data, thunkAPI) => {
      try {
        const response = await AttendanceService.create(data);
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
    "attendance/update",
    async ({ id, data }, thunkAPI) => {
      try {
        const response = await AttendanceService.update(id, data);
        return { user: response.data };
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
//     "attendance/remove",
//     async ({ id }, thunkAPI) => {
//       try {
//         const response = await AttendanceService.remove(id);
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
// "attendance/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await AttendanceService.removeAll();
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

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    extraReducers: {
      [getAll.fulfilled]: (state, action) => {
        state.attendance = action.payload;
      },
      [getAll.rejected]: (state, action) => {
        state.attendance = {};
      },
    },
  });
const { reducer } = attendanceSlice;
export default reducer;