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
        mobile: "",
        email: "",
        gst_number: "",
        address: "",
    };

    const [formData, setFormData] =
        useState(emptyForm);

    useEffect(() => {

        if (supplier) {

            setFormData({
                name: supplier.name || "",
                contact_person:
                    supplier.contact_person || "",
                mobile: supplier.mobile || "",
                email: supplier.email || "",
                gst_number:
                    supplier.gst_number || "",
                address:
                    supplier.address || "",
            });

        } else {

            setFormData(emptyForm);

        }

    }, [supplier]);

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

                    {supplier
                        ? "Edit Supplier"
                        : "Add Supplier"}

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
                                Supplier Name
                            </Form.Label>

                            <Form.Control
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={inputStyle}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Contact Person
                            </Form.Label>

                            <Form.Control
                                name="contact_person"
                                value={formData.contact_person}
                                onChange={handleChange}
                                style={inputStyle}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Mobile
                            </Form.Label>

                            <Form.Control
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                style={inputStyle}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Email
                            </Form.Label>

                            <Form.Control
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={inputStyle}
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
                                style={inputStyle}
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
                                value={formData.address}
                                onChange={handleChange}
                                style={inputStyle}
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

export default SupplierModal;