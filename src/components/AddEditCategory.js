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
    getCategoryByIdAsync,
    createCategoryAsync,
    updateCategoryAsync,
    categoryActions,
} from "../store/slices/categoriesSlice";

const { Option } = Select;

function AddEditCategory() {
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

    // useEffects
    useEffect(() => {
        dispatch(categoryActions.getCategoryByIdReset());
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getCategoryByIdAsync({ id: id }));
        }
    }, [id]);

    const { currentCategory, error, loading } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        if (currentCategory) {
            setFormData(currentCategory);
            form.setFieldsValue(currentCategory);
        }
        return () => {
            form.resetFields();
        };
    }, [currentCategory]);

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleFormSubmit = () => {
        form.validateFields().then((res) => {
            if (id) {
                dispatch(updateCategoryAsync({ ...formData, id: id })).then(
                    () => {
                        form.resetFields();
                        setFormData(initialFormData);
                        navigate("/categories");
                        message.success("Category updated successfully");
                    }
                );
            } else {
                console.log(formData);
                dispatch(createCategoryAsync(formData)).then(() => {
                    form.resetFields();
                    setFormData(initialFormData);
                    navigate("/categories");
                    message.success("Category created successfully");
                });
            }
        });
    };

    return (
        <div
            style={{
                alignItems: "center",
                marginTop: "4rem",
                marginBottom: "0.5rem",
            }}
        >
            <h2>{id ? "Edit Category" : "Add Category"}</h2>

            <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                <Row gutter={16}>
                    <Col xs={24} sm={24}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input category name",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter name"
                                value={formData.name}
                                name="name"
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24}>
                        <Form.Item label="Description" name="description">
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

                <Form.Item>
                    <Button
                        type="secondary"
                        onClick={() => navigate("/categories")}
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

export default AddEditCategory;
