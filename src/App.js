import logo from "./logo.svg";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Flex, Menu } from "antd";
import React from "react";
import ROUTES from "./contansts/ROUTES";

const { Header } = Layout;

const headerStyle = {
    textAlign: "center",
    color: "#fff",
    lineHeight: "64px",
    backgroundColor: "#4096ff",
};

const menuStyle = {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#4096ff",
};

const bodyStyles = {
    paddingInline: "8rem",
};

function App() {
    const navigate = useNavigate();
    let navItems = Object.keys(ROUTES).map((item, index) => {
        return {
            key: index,
            label: item,
        };
    });

    return (
        <div className="App">
            <Header style={headerStyle}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={navItems}
                    onClick={({ key }) => {
                        let idx = navItems[key];
                        navigate(`${ROUTES[idx?.label]}`);
                    }}
                    defaultSelectedKeys={["0"]}
                    style={menuStyle}
                />
            </Header>
            <main style={bodyStyles}>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
