import React, { useEffect, useState } from "react";
import MyTable from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, FireOutlined } from "@ant-design/icons";
import {
    categoryActions,
    deleteCategoryAsync,
    getCategoriesAsync,
} from "../store/slices/categoriesSlice";
import { PAGINATION } from "../contansts/PAGINATION";
import { Button, Popconfirm, message } from "antd";

function Categorys() {
    const { data, loading, error } = useSelector((state) => state.categories);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
                <div>
                    <EditOutlined
                        style={{ marginRight: "1rem" }}
                        onClick={() => navigate(`/categories/${record.id}`)}
                    />
                    <Popconfirm
                        title="Are you sure delete this product?"
                        onConfirm={() => {
                            dispatch(
                                deleteCategoryAsync({ id: record.id })
                            ).then(() => {
                                message.success("Product Deleted Successfully");
                                dispatch(
                                    getCategoriesAsync({
                                        page_number: currentPage,
                                        page_size: pagination.pageSize,
                                    })
                                );
                            });
                        }}
                        okText="Delete"
                        cancelText="Cancel"
                    >
                        <DeleteOutlined style={{ color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];
    useEffect(() => {
        dispatch(
            getCategoriesAsync({
                page_number: currentPage,
                page_size: pagination.pageSize,
            })
        );
    }, [currentPage]);

    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };

    const pagination = {
        ...PAGINATION,
        current: currentPage,
        total: data.total,
        onChange: handlePaginationChange,
    };
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "4rem",
                    marginBottom: "0.5rem",
                }}
            >
                <Button
                    type="primary"
                    onClick={() => navigate("/categories/add")}
                >
                    <FireOutlined />
                    Add Category
                </Button>
            </div>
            <MyTable
                columns={columns}
                data={data.items}
                pagination={pagination}
            />
        </div>
    );
}

export default Categorys;
