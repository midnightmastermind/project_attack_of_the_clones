/**
 * This code imports the createSlice and createAsyncThunk functions from the ReduxJS toolkit, as well as the setMessage function from the message file.
 * It then creates three different async functions - get, getAll, and create - each of which call different TransactionService functions.
 * 
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import TransactionService from "../services/transaction.service";

export const get = createAsyncThunk(
  "transaction/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await TransactionService.get(id);
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
  "transaction/getAll",
  async ({ }, thunkAPI) => {
    try {
      const data = await TransactionService.getAll();
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
    "transaction/create",
    async (data, thunkAPI) => {
      try {
        const response = await TransactionService.create(data);
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
    "transaction/update",
    async ({ id, data }, thunkAPI) => {
      try {
        const data = await TransactionService.update(id, data);
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

//   export const remove = createAsyncThunk(
//     "transaction/remove",
//     async ({ id }, thunkAPI) => {
//       try {
//         const response = await TransactionService.remove(id);
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
// "transaction/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await TransactionService.removeAll();
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

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    extraReducers: {
      [getAll.fulfilled]: (state, action) => {
        state.transaction = action.payload;
      },
      [getAll.rejected]: (state, action) => {
        state.transaction = {};
      },
    },
  });
const { reducer } = transactionSlice;
export default reducer;