import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import productReducer from "./slices/productSlice";

const appStore = configureStore({
    reducer: {
        todos: todoReducer,
        products: productReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default appStore;
