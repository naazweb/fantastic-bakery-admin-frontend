import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Form,
    Row,
    Col,
    Input,
    Select,
    InputNumber,
    Button,
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductByIdAsync,
    createProductAsync,
    updateProductAsync,
    productActions,
} from "../store/slices/productSlice";
import { getCategoriesAsync } from "../store/slices/categoriesSlice";

const { Option } = Select;

function AddEditProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const initialFormData = {
        title: "",
        description: "",
        price: undefined,
        quantity: undefined,
        category_id: 1,
    };
    const [formData, setFormData] = useState(initialFormData);
    useEffect(() => {
        // form.resetFields();
        dispatch(productActions.getProductByIdReset());
        dispatch(getCategoriesAsync());
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getProductByIdAsync({ id: id }));
        }
    }, [id]);

    const { currentProduct, error, loading } = useSelector(
        (state) => state.products
    );
    const { data: categories } = useSelector((state) => state.categories);

    useEffect(() => {
        // form.resetFields();
        if (currentProduct) {
            setFormData(currentProduct);
            form.setFieldsValue(currentProduct);
        }
        return () => {
            form.resetFields();
        };
    }, [currentProduct]);

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleFormSubmit = () => {
        form.validateFields().then((res) => {
            console.log("Res", res);
            if (id) {
                dispatch(updateProductAsync({ ...formData, id: id })).then(
                    () => {
                        form.resetFields();
                        setFormData(initialFormData);
                        navigate("/products");
                        message.success("Product updated successfully");
                    }
                );
            } else {
                console.log(formData);
                dispatch(createProductAsync(formData)).then(() => {
                    form.resetFields();
                    setFormData(initialFormData);
                    navigate("/products");
                    message.success("Product created successfully");
                });
            }
        });
    };

    console.log(currentProduct);
    return (
        <div>
            <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input product name",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter title"
                                value={formData.name}
                                name="name"
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input product description",
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Enter description"
                                value={formData.description}
                                name="description"
                                onChange={(e) =>
                                    handleChange("description", e.target.value)
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input product price",
                                },
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                placeholder="Enter price"
                                value={formData.price}
                                name="price"
                                onChange={(value) =>
                                    handleChange("price", value)
                                }
                                min={0}
                                step={0.01}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter quantity",
                                },
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                placeholder="Enter quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={(value) =>
                                    handleChange("quantity", value)
                                }
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Categories" required>
                            <Select
                                placeholder="Select categories"
                                style={{ width: "100%" }}
                                value={formData.categories}
                                onChange={(value) =>
                                    handleChange("category_id", value)
                                }
                                options={categories.items?.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                            ></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button
                        type="secondary"
                        onClick={() => navigate("/products")}
                    >
                        Back
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEditProduct;
