// src/pages/customers/CustomerModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function CustomerModal({
    show,
    onHide,
    onSubmit,
    customer,
    loading,
}) {
    const emptyForm = {
        customer_type: "RETAIL",
        name: "",
        phone: "",
        email: "",
        gst_number: "",
        city: "",
        state: "",
        pincode: "",
        address: "",
    };

    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (customer) {
            setFormData({
                customer_type: customer.customer_type ? customer.customer_type.toUpperCase() : "RETAIL",
                name: customer.name || "",
                phone: customer.phone || customer.mobile || "",
                email: customer.email || "",
                gst_number: customer.gst_number || "",
                city: customer.city || "",
                state: customer.state || "",
                pincode: customer.pincode || "",
                address: customer.address || "",
            });
        } else {
            setFormData(emptyForm);
        }
        setErrors({});
    }, [customer, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Customer name is required.";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit({
            ...formData,
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            gst_number: formData.gst_number.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
            pincode: formData.pincode.trim(),
            address: formData.address.trim(),
        });
    };

    const handleClose = () => {
        setErrors({});
        onHide();
    };

    const inputStyle = (hasError) => ({
        background: COLORS.inputBackground,
        color: COLORS.text,
        border: `1px solid ${hasError ? "#dc3545" : COLORS.border}`,
    });

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {customer ? "Edit Customer" : "Add Customer"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Label>
                                Customer Type
                            </Form.Label>
                            <Form.Select
                                name="customer_type"
                                value={formData.customer_type}
                                onChange={handleChange}
                                style={inputStyle(false)}
                            >
                                <option value="RETAIL">Retail</option>
                                <option value="WHOLESALE">Wholesale</option>
                            </Form.Select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <Form.Label>
                                Customer Name <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                placeholder="Enter customer name..."
                                style={inputStyle(!!errors.name)}
                            />
                            {errors.name && (
                                <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                                    {errors.name}
                                </Form.Control.Feedback>
                            )}
                        </div>

                        <div className="col-md-6 mb-3">
                            <Form.Label>
                                Phone / Mobile <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                isInvalid={!!errors.phone}
                                placeholder="e.g. 9876543210"
                                style={inputStyle(!!errors.phone)}
                            />
                            {errors.phone && (
                                <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                                    {errors.phone}
                                </Form.Control.Feedback>
                            )}
                        </div>

                        <div className="col-md-6 mb-3">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="customer@example.com"
                                style={inputStyle(false)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <Form.Label>
                                GST Number
                            </Form.Label>
                            <Form.Control
                                name="gst_number"
                                value={formData.gst_number}
                                onChange={handleChange}
                                placeholder="GSTIN (optional)"
                                style={inputStyle(false)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <Form.Label>
                                City
                            </Form.Label>
                            <Form.Control
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                style={inputStyle(false)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <Form.Label>
                                State
                            </Form.Label>
                            <Form.Control
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                                style={inputStyle(false)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <Form.Label>
                                Pincode
                            </Form.Label>
                            <Form.Control
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="Pincode / Postal Code"
                                style={inputStyle(false)}
                            />
                        </div>

                        <div className="col-12">
                            <Form.Label>
                                Address
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Street address, shop number, landmark..."
                                style={inputStyle(false)}
                            />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CustomerModal;