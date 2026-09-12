// src/pages/sales/SalesModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function SalesModal({
    show,
    onHide,
    onSubmit,
    sale,
    masters = { customers: [], products: [] },
    loading,
}) {
    const today = new Date().toISOString().split("T")[0];

    const emptySale = {
        customer: "",
        order_number: "",
        invoice_no: "",
        order_date: today,
        status: "CONFIRMED",
        remarks: "",
        items: [],
    };

    const [saleData, setSaleData] = useState(emptySale);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (sale) {
            const rawItems = sale.order_items || sale.items || [];
            const mappedItems = rawItems.map((item) => ({
                product: item.product_variant?.product?.id || item.product || "",
                product_variant: item.product_variant?.id || item.product_variant || "",
                quantity: item.quantity || 1,
                rate: item.selling_price || item.unit_price || item.rate || 0,
                amount: (Number(item.quantity) || 1) * (Number(item.selling_price || item.unit_price || item.rate) || 0),
            }));

            setSaleData({
                customer: sale.customer?.id || sale.customer || "",
                order_number: sale.order_number || sale.invoice_no || "",
                invoice_no: sale.order_number || sale.invoice_no || "",
                order_date: sale.order_date || sale.sale_date || today,
                status: sale.status || "CONFIRMED",
                remarks: sale.remarks || "",
                items: mappedItems,
            });
        } else {
            setSaleData(emptySale);
        }
        setErrors({});
    }, [sale, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSaleData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const addItem = () => {
        const defaultProduct = masters.products?.[0];
        const defaultRate = defaultProduct ? Number(defaultProduct.selling_price) || 0 : 0;

        setSaleData((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    product: defaultProduct ? defaultProduct.id : "",
                    quantity: 1,
                    rate: defaultRate,
                    amount: defaultRate,
                },
            ],
        }));
        if (errors.items) {
            setErrors((prev) => ({ ...prev, items: "" }));
        }
    };

    const updateItem = (index, field, value) => {
        const items = [...saleData.items];
        items[index] = { ...items[index], [field]: value };

        if (field === "product") {
            const selectedProd = masters.products.find((p) => String(p.id) === String(value));
            if (selectedProd && selectedProd.selling_price) {
                items[index].rate = Number(selectedProd.selling_price) || 0;
            }
        }

        const qty = Number(items[index].quantity) || 0;
        const rate = Number(items[index].rate) || 0;
        items[index].amount = qty * rate;

        setSaleData((prev) => ({
            ...prev,
            items,
        }));

        if (errors.items) {
            setErrors((prev) => ({ ...prev, items: "" }));
        }
    };

    const removeItem = (index) => {
        setSaleData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };

    const total = saleData.items.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!saleData.customer) {
            newErrors.customer = "Please select a customer.";
        }
        if (saleData.items.length === 0) {
            newErrors.items = "Please add at least one item to this sales order.";
        } else {
            const hasInvalidItem = saleData.items.some(
                (item) => !item.product || Number(item.quantity) <= 0
            );
            if (hasInvalidItem) {
                newErrors.items = "All items must have a valid product and quantity greater than 0.";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        onSubmit({
            customer: saleData.customer,
            order_number: saleData.order_number.trim() || saleData.invoice_no.trim(),
            order_date: saleData.order_date,
            status: saleData.status || "CONFIRMED",
            remarks: saleData.remarks.trim(),
            subtotal: total,
            total_amount: total,
            items: saleData.items.map((item) => ({
                product: item.product,
                product_variant: item.product_variant || undefined,
                quantity: Number(item.quantity) || 1,
                rate: Number(item.rate) || 0,
                selling_price: Number(item.rate) || 0,
            })),
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

    const customerList = masters.customers || [];
    const productList = masters.products || [];

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {sale ? "Edit Sales Order" : "New Sales Order"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <Form.Label>
                                Customer <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                name="customer"
                                value={saleData.customer}
                                onChange={handleChange}
                                isInvalid={!!errors.customer}
                                style={inputStyle(!!errors.customer)}
                            >
                                <option value="">-- Select Customer --</option>
                                {customerList.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name} ({customer.customer_type})
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.customer && (
                                <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                                    {errors.customer}
                                </Form.Control.Feedback>
                            )}
                        </div>

                        <div className="col-md-4 mb-3">
                            <Form.Label>SO / Invoice Number</Form.Label>
                            <Form.Control
                                name="order_number"
                                value={saleData.order_number}
                                onChange={handleChange}
                                placeholder="Auto-generated if empty"
                                style={inputStyle(false)}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <Form.Label>Order Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="order_date"
                                value={saleData.order_date}
                                onChange={handleChange}
                                style={inputStyle(false)}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={saleData.status}
                                onChange={handleChange}
                                style={inputStyle(false)}
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="DELIVERED">Delivered</option>
                                <option value="CANCELLED">Cancelled</option>
                            </Form.Select>
                        </div>

                        <div className="col-md-8 mb-3">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                name="remarks"
                                value={saleData.remarks}
                                onChange={handleChange}
                                placeholder="Shipping notes, payment terms..."
                                style={inputStyle(false)}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5>Order Items</h5>
                        <Button variant="outline-primary" size="sm" onClick={addItem}>
                            + Add Item
                        </Button>
                    </div>

                    {errors.items && (
                        <div className="alert alert-danger py-2 mb-3">
                            {errors.items}
                        </div>
                    )}

                    <Table bordered hover responsive variant="dark">
                        <thead>
                            <tr>
                                <th>Product / Garment</th>
                                <th width="140">Quantity</th>
                                <th width="160">Rate (Selling Price)</th>
                                <th width="160">Amount</th>
                                <th width="60" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {saleData.items.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-3">
                                        No items added yet. Click <strong>+ Add Item</strong> above.
                                    </td>
                                </tr>
                            ) : (
                                saleData.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Form.Select
                                                value={item.product}
                                                onChange={(e) => updateItem(index, "product", e.target.value)}
                                                style={inputStyle(false)}
                                            >
                                                <option value="">-- Select Product --</option>
                                                {productList.map((product) => (
                                                    <option key={product.id} value={product.id}>
                                                        {product.name} ({product.sku})
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updateItem(index, "quantity", e.target.value)}
                                                style={inputStyle(false)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                step="0.01"
                                                value={item.rate}
                                                onChange={(e) => updateItem(index, "rate", e.target.value)}
                                                style={inputStyle(false)}
                                            />
                                        </td>
                                        <td className="align-middle fw-bold">
                                            ₹{Number(item.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="text-center align-middle">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => removeItem(index)}
                                            >
                                                ✕
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-end mt-3">
                        <div className="bg-dark p-3 rounded border border-secondary text-end">
                            <span className="text-muted me-3">Total Amount:</span>
                            <span className="fs-4 fw-bold text-success">
                                ₹{Number(total).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="success" disabled={loading}>
                        {loading ? "Saving..." : "Save Sales Order"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default SalesModal;