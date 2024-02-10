import React, { useEffect, useState } from "react";
import MyTable from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    productActions,
    getProductsAsync,
    deleteProductAsync,
} from "../store/slices/productSlice";
import { Button, Input, Select, Popconfirm, message } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    FireOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { PAGINATION } from "../contansts/PAGINATION";
import { getCategoriesAsync } from "../store/slices/categoriesSlice";

function Products() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        data: productsData,
        loading,
        error,
    } = useSelector((state) => state.products);
    const {
        data: categoriesData,
        loading: categoriesLoading,
        error: categoriesError,
    } = useSelector((state) => state.categories);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterParam, setFilterParam] = useState({
        category_id: null,
        search_term: null,
    });

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
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (text, record) => text.name,
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
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
                <div>
                    <EditOutlined
                        style={{ marginRight: "1rem" }}
                        onClick={() => navigate(`/products/${record.id}`)}
                    />
                    <Popconfirm
                        title="Are you sure delete this product?"
                        onConfirm={() => {
                            dispatch(
                                deleteProductAsync({ id: record.id })
                            ).then(() => {
                                message.success("Product Deleted Successfully");
                                dispatch(
                                    getProductsAsync({
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

    // useEffects
    useEffect(() => {
        dispatch(
            getProductsAsync({
                page_number: currentPage,
                page_size: pagination.pageSize,
            })
        );
        dispatch(getCategoriesAsync());
    }, [currentPage]);

    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };

    const handleApply = () => {
        dispatch(
            getProductsAsync({
                page_number: 1,
                page_size: pagination.pageSize,
                ...filterParam,
            })
        );
    };

    const handleClear = () => {
        setFilterParam({
            search_term: null,
            category_id: null,
        });
        dispatch(
            getProductsAsync({
                page_number: 1,
                page_size: pagination.pageSize,
            })
        );
    };

    const pagination = {
        ...PAGINATION,
        current: currentPage,
        total: productsData.total,
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
                    style={{
                        width: "20%",
                    }}
                    onClick={() => navigate("/products/add")}
                >
                    <FireOutlined />
                    Add Product
                </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "2rem",
                }}
            >
                <Input
                    style={{ width: "40%", marginRight: "10px" }}
                    placeholder="Search by Name"
                    allowClear={true}
                    value={filterParam.search_term}
                    onChange={(value) => {
                        console.log("hi", value.target.value);
                        setFilterParam({
                            ...filterParam,
                            search_term: value.target.value,
                        });
                    }}
                />
                <Select
                    placeholder="Select categories"
                    style={{ width: "30%", marginRight: "10px" }}
                    value={filterParam.category_id}
                    allowClear={true}
                    onClear={() => {
                        setFilterParam({
                            ...filterParam,
                            category_id: null,
                        });
                    }}
                    onChange={(value) => {
                        console.log("hi", value);
                        setFilterParam({
                            ...filterParam,
                            category_id: value,
                        });
                    }}
                    options={categoriesData.items?.map((category) => ({
                        value: category.id,
                        label: category.name,
                    }))}
                ></Select>
                <Button
                    type="secondary"
                    style={{ width: "20%", marginLeft: "auto" }}
                    onClick={handleClear}
                >
                    Clear
                </Button>
                <Button
                    type="primary"
                    style={{ width: "20%", marginLeft: "auto" }}
                    onClick={handleApply}
                >
                    Apply
                </Button>
            </div>
            <MyTable
                columns={columns}
                data={productsData.items}
                pagination={pagination}
            />
        </div>
    );
}

export default Products;
