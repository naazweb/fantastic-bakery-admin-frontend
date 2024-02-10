import React, { useEffect, useState } from "react";
import MyTable from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productActions, getProductsAsync } from "../store/slices/productSlice";
import { Button } from "antd";

const PAGINATION = {
    pageSize: 1,
    current: 1,
};

function Products() {
    const { data, loading, error } = useSelector((state) => state.products);
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

    useEffect(() => {
        console.log(pagination);
        dispatch(
            getProductsAsync({
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
        total: data.pages,
        onChange: handlePaginationChange,
    };
    return (
        <div>
            <Button type="primary" onClick={() => navigate("/products/add")}>
                Add Product
            </Button>
            <MyTable
                columns={columns}
                data={data.items}
                pagination={pagination}
            />
        </div>
    );
}

export default Products;
