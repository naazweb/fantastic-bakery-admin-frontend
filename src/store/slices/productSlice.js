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
            const response = await axios.get(apiURL, {
                params: payload,
            });
            return response.data;
        } catch {
            return rejectWithValue("Failed to update");
        }
    }
);

export const createProductAsync = createAsyncThunk(
    "createProduct",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/products`;
            const response = await axios.post(apiURL, payload);
            return response.data;
        } catch {
            return rejectWithValue("Failed to update");
        }
    }
);

export const updateProductAsync = createAsyncThunk(
    "updateProduct",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/products/${payload.id}`;
            const response = await axios.put(apiURL, payload);
            return response.data;
        } catch {
            return rejectWithValue("Failed to update");
        }
    }
);

export const deleteProductAsync = createAsyncThunk(
    "deleteProduct",
    async (payload, { rejectWithValue }) => {
        try {
            const apiURL = `${BASE_URL}/products/${payload.id}`;
            const response = await axios.delete(apiURL);
            return response.data;
        } catch (error) {
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
        getProductByIdReset: (state) => {
            state.currentProduct = {};
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
            state.currentProduct = action.payload.data;
            state.error = false;
        });
        builder.addCase(getProductByIdAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });

        // Create Products
        builder.addCase(createProductAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createProductAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        });
        builder.addCase(createProductAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });

        // Update Proucts
        builder.addCase(updateProductAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProductAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        });
        builder.addCase(updateProductAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });

        // Delete Proucts
        builder.addCase(deleteProductAsync.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
        });
        builder.addCase(deleteProductAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
    },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
