import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIHOST } from "../../contansts/API";

// Define an initial state for questions
const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const getTodoAsync = createAsyncThunk(
    "todos/getAll",
    async (payload, { rejectWithValue }) => {
        try {
            const apiUrl = `${APIHOST}/todos/`;
            console.log("papa", apiUrl);

            // Simulate an API call or any async operation using Axios
            const response = await axios.get(apiUrl);
            console.log(response);
            return response.data;
        } catch {
            return rejectWithValue("Failed to update user");
        }
    }
);

// Create the questions slice
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTodoAsync.pending, (state, action) => {
            console.log("pending", action);
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getTodoAsync.fulfilled, (state, action) => {
            console.log("fulfilled", action);
            state.loading = false;
            state.data = action.payload.data;
            state.error = false;
        });
        builder.addCase(getTodoAsync.rejected, (state, action) => {
            console.log("rejected", action);
            state.loading = false;
            state.error = true;
        });
    },
});

// Export the actions
export const { getTodos, invalidateTag } = todoSlice.actions;

// Export the reducer
export default todoSlice.reducer;
