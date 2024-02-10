import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../contansts/API";

const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
    currentCategory: {},
};

export const getCategoriesAsync = createAsyncThunk(
    "getCategories/getAll",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/categories`;
            const response = await axios.get(apiURL, {
                params: payload,
            });
            return response.data;
        } catch {
            return rejectWithValue("Failed to update");
        }
    }
);

export const getCategoryByIdAsync = createAsyncThunk(
    "getCategoryById/getById",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/categories/${payload.id}`;
            const response = await axios.get(apiURL, {
                params: payload,
            });
            return response.data;
        } catch {
            return rejectWithValue("Failed to update");
        }
    }
);

export const createCategoryAsync = createAsyncThunk(
    "createCategory",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/categories`;
            const response = await axios.post(apiURL, payload);
            return response.data;
        } catch {
            return rejectWithValue("Failed to update");
        }
    }
);

export const updateCategoryAsync = createAsyncThunk(
    "updateCategory",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/categories/${payload.id}`;
            const response = await axios.put(apiURL, payload);
            return response.data;
        } catch {
            return rejectWithValue("Failed to update");
        }
    }
);

export const deleteCategoryAsync = createAsyncThunk(
    "deleteCategory",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/categories/${payload.id}`;
            const response = await axios.delete(apiURL);
            return response.data;
        } catch (error) {
            console.log("Err", error);
            return rejectWithValue("Failed to update");
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        count: (state) => {
            state.count++; // Increment the tag to invalidate previous calls
        },
        getCategoryByIdReset: (state) => {
            state.currentCategory = {};
        },
    },
    extraReducers: (builder) => {
        // Get All Categories
        builder.addCase(getCategoriesAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCategoriesAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.error = false;
        });
        builder.addCase(getCategoriesAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });

        // Get Category By Id
        builder.addCase(getCategoryByIdAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getCategoryByIdAsync.fulfilled, (state, action) => {
            state.loading = false;
            console.log("builder", action.payload);
            state.currentCategory = action.payload.data;
            state.error = false;
        });
        builder.addCase(getCategoryByIdAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });

        // Create Categories
        builder.addCase(createCategoryAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createCategoryAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        });
        builder.addCase(createCategoryAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });

        // Update Proucts
        builder.addCase(updateCategoryAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        });
        builder.addCase(updateCategoryAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });

        // Delete Category
        builder.addCase(deleteCategoryAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        });
        builder.addCase(deleteCategoryAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
    },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
