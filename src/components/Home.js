import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "antd";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ padding: "20px", textAlign: "justify" }}>
                Fantastic Bakery Inventory Management Web Application is a
                cutting-edge solution for bakeries, integrating React.js for the
                frontend, FastAPI for the backend, and Ant Design components for
                an intuitive user interface. This application facilitates
                seamless CRUD operations for managing bakery products and
                categories, leveraging React Query for efficient data fetching
                and state management. With features like responsive design,
                real-time inventory tracking, and user authentication, it
                empowers bakery owners and staff to streamline inventory
                management processes, enhance productivity, and deliver
                exceptional customer service.
            </div>
            <Button
                onClick={() => {
                    navigate("/products");
                }}
            >
                Go to Products
            </Button>
        </>
    );
}

export default Home;
