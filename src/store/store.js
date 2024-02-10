import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categoriesSlice";

const appStore = configureStore({
    reducer: {
        todos: todoReducer,
        products: productReducer,
        categories: categoryReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default appStore;
