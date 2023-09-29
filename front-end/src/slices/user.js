/**
 * This code is for a user slice, which contains asynchronous thunks for getting, creating, updating, and removing users, as well as removing all users.
 * There are also thunks for getting all users and getting all mentors.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import UserService from "../services/user.service";

export const get = createAsyncThunk(
    "user/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await UserService.get(id);
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
    "user/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await UserService.getAll();
            return response.data;
        } catch (error) {
            console.log(error);
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
    "user/getAllForSite",
    async (_, thunkAPI) => {
        try {
            const response = await UserService.getAllForSite();
            return response.data;
        } catch (error) {
            console.log(error);
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

export const getMentors = createAsyncThunk(
    "user/getMentors",
    async (_, thunkAPI) => {
        try {
            const response = await UserService.getMentors();
            return response.data;
        } catch (error) {
            console.log(error);
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
    "user/create",
    async (data, thunkAPI) => {
        try {
            const response = await UserService.create(data);
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
    "user/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await UserService.update(id, data);
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
    "user/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await UserService.remove(id);
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
    "user/removeAll",
    async ({ }, thunkAPI) => {
        try {
            const response = await UserService.removeAll();
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

const initialState = {
    users: null,
    fetching: false,
    fetched: false
};

const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.users = [];
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.pending]: (state, action) => {
            state.fetching = true;
            state.fetched = false;
        },
        [getMentors.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getMentors.rejected]: (state, action) => {
            state.users = [];
            state.fetching = false;
            state.fetched = true;
        },
        [getMentors.pending]: (state, action) => {
            state.fetching = true;
            state.fetched = false;
        },
        [getAllForSite.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAllForSite.rejected]: (state, action) => {
            state.users = [];
            state.fetching = false;
            state.fetched = true;
        },
        [getAllForSite.pending]: (state, action) => {
            state.fetching = true;
            state.fetched = false;
        }
    },
});
const { reducer } = userSlice;
export default reducer;