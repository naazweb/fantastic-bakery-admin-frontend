import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../contansts/API";

const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
    currentProduct: {},
};

export const getProductsAsync = createAsyncThunk(
    "getProducts/getAll",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/products`;
            console.log(payload);
            const response = await axios.get(apiURL, {
                params: payload,
            });
            return response.data;
        } catch {
            return rejectWithValue("Failed to update");
        }
    }
);

export const getProductByIdAsync = createAsyncThunk(
    "getProductById/getById",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/products/${payload.id}`;
            console.log(payload);
            const response = await axios.get(apiURL, {
                params: payload,
            });
            console.log("by id", response.data);
            return response.data;
        } catch {
            return rejectWithValue("Failed to update");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        count: (state) => {
            state.count++; // Increment the tag to invalidate previous calls
        },
    },
    extraReducers: (builder) => {
        // Get All Products
        builder.addCase(getProductsAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProductsAsync.fulfilled, (state, action) => {
            state.loading = false;

            state.data = action.payload.data;
            state.error = false;
        });
        builder.addCase(getProductsAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });

        // Get Product By Id
        builder.addCase(getProductByIdAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProductByIdAsync.fulfilled, (state, action) => {
            state.loading = false;
            console.log("builder", action.payload);
            state.currentProduct = action.payload.data;
            state.error = false;
        });
        builder.addCase(getProductByIdAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
    },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
