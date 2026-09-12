// src/pages/invoices/InvoiceModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function InvoiceModal({
    show,
    onHide,
    onSubmit,
    invoice,
    salesOrders = [],
    loading,
}) {
    const emptyForm = {
        sales_order: "",
        invoice_number: "",
        invoice_date: new Date().toISOString().split("T")[0],
        due_date: new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
        total_amount: "",
        discount: 0,
        tax: 0,
        status: "PENDING",
        remarks: "",
    };

    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (invoice) {
            setFormData({
                sales_order: invoice.sales_order || "",
                invoice_number: invoice.invoice_number || "",
                invoice_date: invoice.invoice_date || "",
                due_date: invoice.due_date || "",
                total_amount: invoice.total_amount || "",
                discount: invoice.discount || 0,
                tax: invoice.tax || 0,
                status: invoice.status || "PENDING",
                remarks: invoice.remarks || "",
            });
        } else {
            const randomNum = "INV-" + Math.floor(100000 + Math.random() * 900000);
            setFormData({
                ...emptyForm,
                invoice_number: randomNum,
            });
        }
    }, [invoice, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "sales_order") {
            const order = salesOrders.find((so) => String(so.id) === String(value));
            setFormData({
                ...formData,
                sales_order: value,
                total_amount: order ? order.total_amount : formData.total_amount,
                discount: order ? order.discount : formData.discount,
                tax: order ? order.tax : formData.tax,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputStyle = {
        background: COLORS.inputBackground,
        color: COLORS.text,
        border: `1px solid ${COLORS.border}`,
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header
                closeButton
                style={{
                    background: COLORS.card,
                    borderBottom: `1px solid ${COLORS.border}`,
                    color: COLORS.text,
                }}
            >
                <Modal.Title>{invoice ? "Edit Invoice" : "Create Invoice"}</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body
                    style={{
                        background: COLORS.card,
                        color: COLORS.text,
                    }}
                >
                    <div className="row g-3">
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Sales Order *</Form.Label>
                                <Form.Select
                                    name="sales_order"
                                    value={formData.sales_order}
                                    onChange={handleChange}
                                    required
                                    disabled={!!invoice}
                                    style={inputStyle}
                                >
                                    <option value="">Select Sales Order</option>
                                    {salesOrders.map((so) => (
                                        <option key={so.id} value={so.id}>
                                            {so.order_number} ({so.customer_name || `Customer #${so.customer}`}) - ${so.total_amount}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Invoice Number *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="invoice_number"
                                    value={formData.invoice_number}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Invoice Date *</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="invoice_date"
                                    value={formData.invoice_date}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Due Date *</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="due_date"
                                    value={formData.due_date}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Total Amount *</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="total_amount"
                                    value={formData.total_amount}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Discount</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-4">
                            <Form.Group>
                                <Form.Label>Tax</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="tax"
                                    value={formData.tax}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="PARTIAL">Partial</option>
                                    <option value="PAID">Paid</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    placeholder="Optional notes..."
                                    style={inputStyle}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer
                    style={{
                        background: COLORS.card,
                        borderTop: `1px solid ${COLORS.border}`,
                    }}
                >
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: COLORS.primary,
                            border: "none",
                        }}
                    >
                        {loading ? "Saving..." : invoice ? "Update Invoice" : "Create Invoice"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default InvoiceModal;
