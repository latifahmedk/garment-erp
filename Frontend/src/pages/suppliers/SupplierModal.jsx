// src/pages/suppliers/SupplierModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function SupplierModal({
    show,
    onHide,
    onSubmit,
    supplier,
    loading,
}) {
    const emptyForm = {
        name: "",
        contact_person: "",
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
        if (supplier) {
            setFormData({
                name: supplier.name || "",
                contact_person: supplier.contact_person || "",
                phone: supplier.phone || supplier.mobile || "",
                email: supplier.email || "",
                gst_number: supplier.gst_number || "",
                city: supplier.city || "",
                state: supplier.state || "",
                pincode: supplier.pincode || "",
                address: supplier.address || "",
            });
        } else {
            setFormData(emptyForm);
        }
        setErrors({});
    }, [supplier, show]);

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
            newErrors.name = "Supplier name is required.";
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
            contact_person: formData.contact_person.trim(),
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
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {supplier ? "Edit Supplier" : "Add Supplier"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <Form.Label>
                                Supplier Name <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                placeholder="e.g. Vardhman Textiles, Arvind Mills..."
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
                                Contact Person
                            </Form.Label>
                            <Form.Control
                                name="contact_person"
                                value={formData.contact_person}
                                onChange={handleChange}
                                placeholder="Contact person / manager name"
                                style={inputStyle(false)}
                            />
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
                                placeholder="supplier@example.com"
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
                                placeholder="Factory / office address, industrial area..."
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

export default SupplierModal;