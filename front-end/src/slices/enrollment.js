/**
 * This code contains a reducer and some async thunks for fetching enrollment data.
 * The reducer updates the state with the fetched data.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import EnrollmentService from "../services/enrollment.service";

export const get = createAsyncThunk(
  "enrollment/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await EnrollmentService.get(id);
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
  "enrollment/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await EnrollmentService.getAll();
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
    "enrollment/getAllForUser",
    async (_, thunkAPI) => {
      try {
        const response = await EnrollmentService.getAllForUser();
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
    "enrollment/getAllForSite",
    async (_, thunkAPI) => {
      try {
        const response = await EnrollmentService.getAllForSite();
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
    "enrollment/create",
    async (data, thunkAPI) => {
      try {
        data.enrolled = true;
        const response = await EnrollmentService.create(data);
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
    "enrollment/update",
    async ({ id, data }, thunkAPI) => {
      try {
        const response = await EnrollmentService.update(id, data);
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

//   export const getAllByUserId = createAsyncThunk(
//     "enrollment/getAllByUserId",
//     async ({ id }, thunkAPI) => {
//       try {
//         const data = await EnrollmentService.getAllByUserId(id);
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
//   export const remove = createAsyncThunk(
//     "enrollment/remove",
//     async ({ id }, thunkAPI) => {
//       try {
//         const response = await EnrollmentService.remove(id);
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
// "enrollment/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await EnrollmentService.removeAll();
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

// export const findByTitle = createAsyncThunk(
//     "enrollment/findByTitle",
//     async ({ title }, thunkAPI) => {
//         try {
//         const response = await EnrollmentService.findByTitle(title);
//         thunkAPI.dispatch(setMessage(response.data.message));
//         return response.data;
//         } catch (error) {
//         const message =
//             (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//             error.message ||
//             error.toString();
//         thunkAPI.dispatch(setMessage(message));
//         return thunkAPI.rejectWithValue();
//         }
//     }
// );

const initialState = {};

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    extraReducers: {
      [getAll.fulfilled]: (state, action) => {
        state.enrollments = action.payload;
      },
      [getAll.rejected]: (state, action) => {
        state.enrollments = [];
      },
      [getAllForUser.fulfilled]: (state, action) => {
        state.enrollments = action.payload;
      },
      [getAllForUser.rejected]: (state, action) => {
        state.enrollments = [];
      },
      [getAllForSite.fulfilled]: (state, action) => {
        state.enrollments = action.payload;
      },
      [getAllForSite.rejected]: (state, action) => {
        state.enrollments = [];
      },
      [create.fulfilled]: (state, action) => {
        const payload = action.payload;
        const enrollments = state.enrollment
        let updated_enrollment = enrollments.map((enrollment, index) => {
            return enrollment.id === payload.id ? payload : enrollment;
        });
        state.enrollments = updated_enrollment;
        
      },
      [create.rejected]: (state, action) => {
       console.log("failed to create enrollment");
      },
    },
  });
const { reducer } = enrollmentSlice;
export default reducer;