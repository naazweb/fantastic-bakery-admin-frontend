import React, { useEffect, useState } from "react";
import MyTable from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
    categoryActions,
    getCategoriesAsync,
} from "../store/slices/categoriesSlice";
import { Button } from "antd";

const PAGINATION = {
    total: 15,
    pageSize: 1,
    current: 1,
};

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
            render: (text, record) => (
                <div onClick={() => navigate(`/categories/${record.id}`)}>
                    <a>{text}</a>
                </div>
            ),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
    ];
    useEffect(() => {
        console.log(pagination);
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
        total: data.pages,
        onChange: handlePaginationChange,
    };
    return (
        <div>
            <Button type="primary" onClick={() => navigate("/categories/add")}>
                Add Category
            </Button>
            <MyTable
                columns={columns}
                data={data.items}
                pagination={pagination}
            />
        </div>
    );
}

export default Categorys;
