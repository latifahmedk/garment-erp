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
        customer_type: "Retail",
        name: "",
        mobile: "",
        email: "",
        gst_number: "",
        address: "",
        credit_limit: "",
    };

    const [formData, setFormData] =
        useState(emptyForm);

    useEffect(() => {
        if (customer) {
            setFormData({
                customer_type:
                    customer.customer_type,
                name: customer.name,
                mobile: customer.mobile,
                email: customer.email,
                gst_number:
                    customer.gst_number,
                address:
                    customer.address,
                credit_limit:
                    customer.credit_limit,
            });
        } else {
            setFormData(emptyForm);
        }
    }, [customer]);

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
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {customer
                        ? "Edit Customer"
                        : "Add Customer"}
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
                                Customer Type
                            </Form.Label>

                            <Form.Select
                                name="customer_type"
                                value={
                                    formData.customer_type
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                            >
                                <option>
                                    Retail
                                </option>

                                <option>
                                    Wholesale
                                </option>

                            </Form.Select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Customer Name
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
                                Mobile
                            </Form.Label>

                            <Form.Control
                                name="mobile"
                                value={
                                    formData.mobile
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
                                Email
                            </Form.Label>

                            <Form.Control
                                name="email"
                                value={
                                    formData.email
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
                                GST Number
                            </Form.Label>

                            <Form.Control
                                name="gst_number"
                                value={
                                    formData.gst_number
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
                                Credit Limit
                            </Form.Label>

                            <Form.Control
                                name="credit_limit"
                                value={
                                    formData.credit_limit
                                }
                                onChange={
                                    handleChange
                                }
                                style={
                                    inputStyle
                                }
                            />

                        </div>

                        <div className="col-12">

                            <Form.Label>
                                Address
                            </Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="address"
                                value={
                                    formData.address
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

export default CustomerModal;