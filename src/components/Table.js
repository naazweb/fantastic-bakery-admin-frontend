import React, { useState } from "react";
import { Input, Table } from "antd";
import { useNavigate } from "react-router-dom";

const MyTable = ({ data, pagination, columns }) => {
    const navigate = useNavigate();

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
