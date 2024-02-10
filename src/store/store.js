import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categoriesSlice";

const appStore = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default appStore;
