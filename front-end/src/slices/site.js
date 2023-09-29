/**
 * This is the site slice.
 * It contains the reducer and the initial state for the site domain.
 * It also defines some async thunks for fetching sites.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import SiteService from "../services/site.service";

export const get = createAsyncThunk(
  "site/get",
  async ({ id }, thunkAPI) => {
    try {
      const response = await SiteService.get(id);
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

export const getByName = createAsyncThunk(
    "site/getByName",
    async ({ name }, thunkAPI) => {
      try {
        const response = await SiteService.getByName(name);
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
  "site/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await SiteService.getAll();
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
    "site/create",
    async (data, thunkAPI) => {
      try {
        const response = await SiteService.create(data);
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
    "site/update",
    async ({ id, data }, thunkAPI) => {
      try {
        const response = await SiteService.update(id, data);
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
"site/remove",
async ({ id }, thunkAPI) => {
    try {
    const response = await SiteService.remove(id);
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

export const removeAll = createAsyncThunk(
"site/removeAll",
async ({ }, thunkAPI) => {
    try {
    const response = await SiteService.removeAll();
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

const initialState = { fetched: false, fetching: false };

const siteSlice = createSlice({
    name: "site",
    initialState,
    extraReducers: {
      [getAll.fulfilled]: (state, action) => {
        state.sites = action.payload;
      },
      [getAll.rejected]: (state, action) => {
        state.site = [];
      },
      [getByName.fulfilled]: (state, action) => {
        state.current_site = action.payload;
        state.fetching = false;
        state.fetched = true;
      },
      [getByName.pending]: (state, action) => {
        state.fetching = true;
        state.fetched = false;
      },
      [getByName.rejected]: (state, action) => {
        state.current_site = null;
        state.fetching = false;
        state.fetched = true;
      },
    },
  });
const { reducer } = siteSlice;
export default reducer;