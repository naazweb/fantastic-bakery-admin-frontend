import React, { useState } from "react";
import { Input, Table } from "antd";
import { useNavigate } from "react-router-dom";

const MyTable = ({ data, pagination, total, current }) => {
    const navigate = useNavigate();
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <div onClick={() => navigate(`/products/${record.id}`)}>
                    <a>{text}</a>
                </div>
            ),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
    ];

    const [searchText, setSearchText] = useState("");

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            // total={total}
            // current={current}
            // pagination={
            //     current:current,
            //     total: total
            // }
        />
    );
};
export default MyTable;
