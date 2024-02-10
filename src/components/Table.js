import React, { useState } from "react";
import { Input, Table } from "antd";
import { useNavigate } from "react-router-dom";

const MyTable = ({ data, pagination, columns }) => {
    return (
        <Table columns={columns} dataSource={data} pagination={pagination} />
    );
};
export default MyTable;
