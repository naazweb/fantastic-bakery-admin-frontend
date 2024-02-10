import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ROUTES from "./contansts/ROUTES";
import Home from "./components/Home";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./components/Products";
import Category from "./components/Category";
import { Provider } from "react-redux";
import appStore from "./store/store";
import AddEditProduct from "./components/AddEditProduct";
import AddEditCategory from "./components/AddEditCategory";
const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
            },
            {
                path: `${ROUTES.PRODUCTS}`, // Change to `${ROUTES.PRODUCTS}`
                element: <Outlet />, // Use Outlet to render child routes
                children: [
                    {
                        path: ":id", // Change to ":id"
                        element: <AddEditProduct />,
                    },
                    {
                        path: "add", // Remove `${ROUTES.PRODUCTS}/`
                        element: <AddEditProduct />,
                    },
                    {
                        path: "", // Empty path for <Products />
                        element: <Products />,
                    },
                ],
            },
            {
                path: ROUTES.CATEGORY,
                element: <Outlet />,
                children: [
                    {
                        path: ":id", // Change to ":id"
                        element: <AddEditCategory />,
                    },
                    {
                        path: "add", // Remove `${ROUTES.PRODUCTS}/`
                        element: <AddEditCategory />,
                    },
                    {
                        path: "", // Empty path for <Products />
                        element: <Category />,
                    },
                ],
            },
        ],
    },
]);

root.render(
    <Provider store={appStore}>
        <RouterProvider router={appRouter} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
