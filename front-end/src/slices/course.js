/**
 * This code contains functions for fetching, creating, and updating courses, as well as removing courses.
 * It also includes error handling for when these functions fail.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import CourseService from "../services/course.service";

export const get = createAsyncThunk(
    "course/get",
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
    "course/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await CourseService.getAll();
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
    "course/getAllForSite",
    async (_, thunkAPI) => {
        try {
            const response = await CourseService.getAllForSite();
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
    "course/create",
    async ({title, description, user_id}, thunkAPI) => {
        try {
            const response = await CourseService.create({title, description, user_id});
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
    "course/update",
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
    "course/remove",
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

export const removeAll = createAsyncThunk(
    "course/removeAll",
    async (_, thunkAPI) => {
        try {
            const response = await CourseService.removeAll();
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
    courses: null,
    fetched: false,
    fetching: false,
    currentCourse: null
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            state.courses = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.rejected]: (state, action) => {
            state.courses = [];
            state.fetching = false;
            state.fetched = true;
        },
        [getAll.pending]: (state, action) => {
            state.fetching = true;
            state.fetched = false;
        },
        [getAllForSite.pending]: (state, action) => {
            state.fetching = true;
            state.fetched = false;
        },
        [getAllForSite.fulfilled]: (state, action) => {
            state.courses = action.payload;
            state.fetching = false;
            state.fetched = true;
        },
        [getAllForSite.rejected]: (state, action) => {
            state.courses = [];
            state.fetching = false;
            state.fetched = true;
        },
        [get.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const courses = state.courses;
        },
        [get.rejected]: (state, action) => {
            console.log("get rejected");
        },
        [update.fulfilled]: (state, action) => {
            // const payload = action.payload;
            // const courses = state.courses;
            // state.courses = courses.map((course, index) => {
            //     return course.id === payload.id ? payload : course;
            // });
        },
        [update.rejected]: (state, action) => {
            console.log("update rejected");
        },
        [create.fulfilled]: (state, action) => {
            const payload = action.payload;
            state.courses.push(payload);
        },
        [create.rejected]: (state, action) => {
            console.log("update rejected");
        },
       
    },
});
const { reducer } = courseSlice;
export default reducer;