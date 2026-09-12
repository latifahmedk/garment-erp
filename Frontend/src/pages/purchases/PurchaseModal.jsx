// src/pages/purchases/PurchaseModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function PurchaseModal({
    show,
    onHide,
    onSubmit,
    purchase,
    masters = { suppliers: [], products: [] },
    loading,
}) {
    const today = new Date().toISOString().split("T")[0];

    const emptyPurchase = {
        supplier: "",
        order_number: "",
        invoice_no: "",
        order_date: today,
        status: "ORDERED",
        remarks: "",
        items: [],
    };

    const [purchaseData, setPurchaseData] = useState(emptyPurchase);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (purchase) {
            const rawItems = purchase.order_items || purchase.items || [];
            const mappedItems = rawItems.map((item) => ({
                product: item.product_variant?.product?.id || item.product || "",
                product_variant: item.product_variant?.id || item.product_variant || "",
                quantity: item.quantity || 1,
                rate: item.unit_price || item.rate || 0,
                amount: (Number(item.quantity) || 1) * (Number(item.unit_price || item.rate) || 0),
            }));

            setPurchaseData({
                supplier: purchase.supplier?.id || purchase.supplier || "",
                order_number: purchase.order_number || purchase.invoice_no || "",
                invoice_no: purchase.order_number || purchase.invoice_no || "",
                order_date: purchase.order_date || purchase.purchase_date || today,
                status: purchase.status || "ORDERED",
                remarks: purchase.remarks || "",
                items: mappedItems,
            });
        } else {
            setPurchaseData(emptyPurchase);
        }
        setErrors({});
    }, [purchase, show]);

    const handlePurchaseChange = (e) => {
        const { name, value } = e.target;
        setPurchaseData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const addItem = () => {
        const defaultProduct = masters.products?.[0];
        const defaultRate = defaultProduct ? Number(defaultProduct.cost_price) || 0 : 0;

        setPurchaseData((prev) => ({
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
        const items = [...purchaseData.items];
        items[index] = { ...items[index], [field]: value };

        // If product changed, auto-populate default rate from cost_price
        if (field === "product") {
            const selectedProd = masters.products.find((p) => String(p.id) === String(value));
            if (selectedProd && selectedProd.cost_price) {
                items[index].rate = Number(selectedProd.cost_price) || 0;
            }
        }

        const qty = Number(items[index].quantity) || 0;
        const rate = Number(items[index].rate) || 0;
        items[index].amount = qty * rate;

        setPurchaseData((prev) => ({
            ...prev,
            items,
        }));

        if (errors.items) {
            setErrors((prev) => ({ ...prev, items: "" }));
        }
    };

    const removeItem = (index) => {
        setPurchaseData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };

    const total = purchaseData.items.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!purchaseData.supplier) {
            newErrors.supplier = "Please select a supplier.";
        }
        if (purchaseData.items.length === 0) {
            newErrors.items = "Please add at least one item to this purchase order.";
        } else {
            const hasInvalidItem = purchaseData.items.some(
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
            supplier: purchaseData.supplier,
            order_number: purchaseData.order_number.trim() || purchaseData.invoice_no.trim(),
            order_date: purchaseData.order_date,
            status: purchaseData.status || "ORDERED",
            remarks: purchaseData.remarks.trim(),
            subtotal: total,
            total_amount: total,
            items: purchaseData.items.map((item) => ({
                product: item.product,
                product_variant: item.product_variant || undefined,
                quantity: Number(item.quantity) || 1,
                rate: Number(item.rate) || 0,
                unit_price: Number(item.rate) || 0,
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

    const supplierList = masters.suppliers || [];
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
                    {purchase ? "Edit Purchase Order" : "New Purchase Order"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <Form.Label>
                                Supplier <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                name="supplier"
                                value={purchaseData.supplier}
                                onChange={handlePurchaseChange}
                                isInvalid={!!errors.supplier}
                                style={inputStyle(!!errors.supplier)}
                            >
                                <option value="">-- Select Supplier --</option>
                                {supplierList.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </Form.Select>
                            {errors.supplier && (
                                <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                                    {errors.supplier}
                                </Form.Control.Feedback>
                            )}
                        </div>

                        <div className="col-md-4 mb-3">
                            <Form.Label>PO / Invoice Number</Form.Label>
                            <Form.Control
                                name="order_number"
                                value={purchaseData.order_number}
                                onChange={handlePurchaseChange}
                                placeholder="Auto-generated if empty"
                                style={inputStyle(false)}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <Form.Label>Order Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="order_date"
                                value={purchaseData.order_date}
                                onChange={handlePurchaseChange}
                                style={inputStyle(false)}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={purchaseData.status}
                                onChange={handlePurchaseChange}
                                style={inputStyle(false)}
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="ORDERED">Ordered</option>
                                <option value="RECEIVED">Received</option>
                                <option value="CANCELLED">Cancelled</option>
                            </Form.Select>
                        </div>

                        <div className="col-md-8 mb-3">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                name="remarks"
                                value={purchaseData.remarks}
                                onChange={handlePurchaseChange}
                                placeholder="Notes, delivery instructions..."
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
                                <th>Product / Material</th>
                                <th width="140">Quantity</th>
                                <th width="160">Rate (Cost)</th>
                                <th width="160">Amount</th>
                                <th width="60" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseData.items.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-3">
                                        No items added yet. Click <strong>+ Add Item</strong> above.
                                    </td>
                                </tr>
                            ) : (
                                purchaseData.items.map((item, index) => (
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
                        {loading ? "Saving..." : "Save Purchase"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default PurchaseModal;