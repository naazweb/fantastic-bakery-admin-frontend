import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { getProductByIdAsync } from "../store/slices/productSlice";

const { Option } = Select;

function EditProduct() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(getProductByIdAsync({ id: id }));
    }, []);

    const { currentProduct, error, loading } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        setFormData(currentProduct);
        form.setFieldsValue(currentProduct);
    }, [currentProduct]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: undefined,
        quantity: undefined,
        categories: [],
    });

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleFormSubmit = () => {
        // dispatch(createProducts("hello"));
        // if (
        //     formData.title &&
        //     formData.description &&
        //     formData.price !== undefined &&
        //     formData.quantity !== undefined &&
        //     formData.categories.length > 0 &&
        //     formData.ingredients.length > 0
        // ) {
        //     // All fields are filled, handle form submission logic here
        //     message.success("Form submitted successfully");
        //     // Reset form after successful submission
        //     setFormData({
        //         title: "",
        //         description: "",
        //         price: undefined,
        //         quantity: undefined,
        //         categories: [],
        //         ingredients: [],
        //     });
        // } else {
        //     // Display error message if any field is missing
        //     message.error("Please fill in all required fields");
        // }
    };

    console.log(currentProduct);
    return (
        <div>
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Name" name="name" required>
                            <Input
                                placeholder="Enter title"
                                value={formData.title}
                                name="name"
                                onChange={(e) =>
                                    handleChange("title", e.target.value)
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Description"
                            name="description"
                            required
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
                        <Form.Item label="Price" name="price" required>
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
                        <Form.Item label="Quantity" name="quanitity" required>
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
                                mode="multiple"
                                placeholder="Select categories"
                                style={{ width: "100%" }}
                                value={formData.categories}
                                onChange={(value) =>
                                    handleChange("categories", value)
                                }
                            >
                                <Option value="category1">Category 1</Option>
                                <Option value="category2">Category 2</Option>
                                <Option value="category3">Category 3</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Ingredients" required>
                            <Select
                                mode="tags"
                                placeholder="Enter ingredients"
                                style={{ width: "100%" }}
                                value={formData.ingredients}
                                onChange={(value) =>
                                    handleChange("ingredients", value)
                                }
                                maxTagCount={3}
                                maxTagTextLength={10}
                                tokenSeparators={[","]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" onClick={handleFormSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditProduct;
