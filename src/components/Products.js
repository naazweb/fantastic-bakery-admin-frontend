import React, { useEffect, useState } from "react";
import MyTable from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { productActions, getProductsAsync } from "../store/slices/productSlice";

const PAGINATION = {
    total: 15,
    pageSize: 1,
    current: 1,
};

function Products() {
    const { data, loading, error } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
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
            <MyTable data={data.items} pagination={pagination} />
        </div>
    );
}

export default Products;
