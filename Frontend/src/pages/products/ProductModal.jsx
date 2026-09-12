// src/pages/products/ProductModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function ProductModal({
    show,
    onHide,
    onSubmit,
    product,
    masters,
    loading,
}) {
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: "",
        unit: "",
        fabric: "",
        selling_price: "",
        cost_price: "",
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                sku: product.sku || "",
                category: product.category || "",
                unit: product.unit || "",
                fabric: product.fabric || "",
                selling_price:
                    product.selling_price || "",
                cost_price:
                    product.cost_price || "",
            });
        } else {
            setFormData({
                name: "",
                sku: "",
                category: "",
                unit: "",
                fabric: "",
                selling_price: "",
                cost_price: "",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const inputStyle = {
        background:
            COLORS.inputBackground,
        color: COLORS.text,
        border: `1px solid ${COLORS.border}`,
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {product
                        ? "Edit Product"
                        : "Add Product"}
                </Modal.Title>
            </Modal.Header>

            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }}
            >
                <Modal.Body>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Product Name
                            </Form.Label>

                            <Form.Control
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                SKU
                            </Form.Label>

                            <Form.Control
                                name="sku"
                                value={
                                    formData.sku
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Category
                            </Form.Label>

                            <Form.Select
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                            >
                                <option value="">
                                    Select
                                </option>

                                {masters.categories.map(
                                    (
                                        item
                                    ) => (
                                        <option
                                            key={
                                                item.id
                                            }
                                            value={
                                                item.id
                                            }
                                        >
                                            {
                                                item.name
                                            }
                                        </option>
                                    )
                                )}

                            </Form.Select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Unit
                            </Form.Label>

                            <Form.Select
                                name="unit"
                                value={
                                    formData.unit
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                            >
                                <option value="">
                                    Select
                                </option>

                                {masters.units.map(
                                    (
                                        item
                                    ) => (
                                        <option
                                            key={
                                                item.id
                                            }
                                            value={
                                                item.id
                                            }
                                        >
                                            {
                                                item.name
                                            }
                                        </option>
                                    )
                                )}

                            </Form.Select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Fabric
                            </Form.Label>

                            <Form.Select
                                name="fabric"
                                value={
                                    formData.fabric
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                            >
                                <option value="">
                                    Select
                                </option>

                                {masters.fabrics.map(
                                    (
                                        item
                                    ) => (
                                        <option
                                            key={
                                                item.id
                                            }
                                            value={
                                                item.id
                                            }
                                        >
                                            {
                                                item.name
                                            }
                                        </option>
                                    )
                                )}

                            </Form.Select>

                        </div>

                        <div className="col-md-3 mb-3">

                            <Form.Label>
                                Cost Price
                            </Form.Label>

                            <Form.Control
                                name="cost_price"
                                value={
                                    formData.cost_price
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                            />

                        </div>

                        <div className="col-md-3 mb-3">

                            <Form.Label>
                                Selling Price
                            </Form.Label>

                            <Form.Control
                                name="selling_price"
                                value={
                                    formData.selling_price
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                            />

                        </div>

                    </div>

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={onHide}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Save"}
                    </Button>

                </Modal.Footer>

            </Form>
        </Modal>
    );
}

export default ProductModal;