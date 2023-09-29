/**
 * This code imports the createSlice and createAsyncThunk functions from the '@reduxjs/toolkit' library.
 * It also imports the setMessage function from the './message' file.
 * The code then creates three constants - get, getAll, and create - using the createAsyncThunk
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import SiteCourseAvailabilityService from "../services/site_course_availability.service";

export const get = createAsyncThunk(
    "site_course_availability/get",
    async ({ id }, thunkAPI) => {
        try {
            const response = await SiteCourseAvailabilityService.get(id);
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
    "site_course_availability/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await SiteCourseAvailabilityService.getAll();
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
    "site_course_availability/create",
    async (data, thunkAPI) => {
        try {
            const response = await SiteCourseAvailabilityService.create(data);
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
    "site_course_availability/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await SiteCourseAvailabilityService.update(id, data);
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
    "site_course_availability/remove",
    async ({ id }, thunkAPI) => {
        try {
            const response = await SiteCourseAvailabilityService.remove(id);
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
// "site_course_availability/removeAll",
// async ({ }, thunkAPI) => {
//     try {
//     const response = await SiteCourseAvailabilityService.removeAll();
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

const initialState = { site_course_availability: [] };

const siteCourseAvailabilitySlice = createSlice({
    name: "site_course_availability",
    initialState,
    extraReducers: {
        [getAll.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.site_course_availability = action.payload;
        },
        [getAll.rejected]: (state, action) => {
            state.site_course_availability = [];
        },
        [create.fulfilled]: (state, action) => {
            state.site_course_availability.push(action.payload);
        },
        [create.rejected]: (state, action) => {
            console.log("create rejected");
        },
        [remove.fulfilled]: (state, action) => {
            state.site_course_availability = state.site_course_availability.map((course_availability, index) => {
                if (course_availability._id != action.payload) {
                    return course_availability;
                }
            });
        },
        [remove.rejected]: (state, action) => {
            console.log("remove rejected");
        },
    },
});
const { reducer } = siteCourseAvailabilitySlice;
export default reducer;