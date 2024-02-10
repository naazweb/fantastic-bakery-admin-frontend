import React, { useEffect } from "react";
import { getTodoAsync } from "../store/slices/todoSlice";

import { Button } from "antd";

function Home() {
    return (
        <div>
            Home
            <button>"Call Invalidate"</button>
            <div>
                Increment
                <Button type="primary">Hello there</Button>
            </div>
        </div>
    );
}

export default Home;
