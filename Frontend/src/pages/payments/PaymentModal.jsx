// src/pages/payments/PaymentModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function PaymentModal({
    show,
    onHide,
    onSubmit,
    payment,
    invoices = [],
    loading,
}) {
    const emptyForm = {
        invoice: "",
        payment_date: new Date().toISOString().split("T")[0],
        amount: "",
        payment_method: "UPI",
        reference_number: "",
        remarks: "",
    };

    const [formData, setFormData] = useState(emptyForm);
    const [selectedInvoiceInfo, setSelectedInvoiceInfo] = useState(null);

    useEffect(() => {
        if (payment) {
            setFormData({
                invoice: payment.invoice || "",
                payment_date: payment.payment_date || "",
                amount: payment.amount || "",
                payment_method: payment.payment_method || "UPI",
                reference_number: payment.reference_number || "",
                remarks: payment.remarks || "",
            });
            const inv = invoices.find((i) => String(i.id) === String(payment.invoice));
            setSelectedInvoiceInfo(inv || null);
        } else {
            setFormData(emptyForm);
            setSelectedInvoiceInfo(null);
        }
    }, [payment, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "invoice") {
            const inv = invoices.find((i) => String(i.id) === String(value));
            setSelectedInvoiceInfo(inv || null);
            setFormData({
                ...formData,
                invoice: value,
                amount: inv ? inv.balance_amount || inv.total_amount : formData.amount,
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
                <Modal.Title>{payment ? "Edit Payment" : "Record Payment"}</Modal.Title>
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
                                <Form.Label>Invoice *</Form.Label>
                                <Form.Select
                                    name="invoice"
                                    value={formData.invoice}
                                    onChange={handleChange}
                                    required
                                    disabled={!!payment}
                                    style={inputStyle}
                                >
                                    <option value="">Select Invoice</option>
                                    {invoices.map((inv) => (
                                        <option key={inv.id} value={inv.id}>
                                            {inv.invoice_number} ({inv.customer_name || `Customer #${inv.sales_order}`}) - Balance: ${inv.balance_amount}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {selectedInvoiceInfo && (
                                <small className="text-muted d-block mt-1">
                                    Total: ${selectedInvoiceInfo.total_amount} | Paid: ${selectedInvoiceInfo.paid_amount} | Balance: ${selectedInvoiceInfo.balance_amount}
                                </small>
                            )}
                        </div>

                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Payment Date *</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="payment_date"
                                    value={formData.payment_date}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Amount ($) *</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    placeholder="0.00"
                                    style={inputStyle}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Payment Method *</Form.Label>
                                <Form.Select
                                    name="payment_method"
                                    value={formData.payment_method}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value="UPI">UPI</option>
                                    <option value="CASH">Cash</option>
                                    <option value="BANK">Bank Transfer / NEFT</option>
                                    <option value="CARD">Credit / Debit Card</option>
                                </Form.Select>
                            </Form.Group>
                        </div>

                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Reference / Transaction ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="reference_number"
                                    value={formData.reference_number}
                                    onChange={handleChange}
                                    placeholder="e.g. UTR / Cheque / Txn #"
                                    style={inputStyle}
                                />
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
                        {loading ? "Saving..." : payment ? "Update Payment" : "Record Payment"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default PaymentModal;
