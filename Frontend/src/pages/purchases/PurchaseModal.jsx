// src/pages/purchases/PurchaseModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function PurchaseModal({
    show,
    onHide,
    onSubmit,
    purchase,
    masters,
    loading,
}) {

    const emptyPurchase = {
        supplier: "",
        invoice_no: "",
        purchase_date: "",
        items: [],
    };

    const [purchaseData, setPurchaseData] =
        useState(emptyPurchase);

    useEffect(() => {

        if (purchase) {

            setPurchaseData(purchase);

        } else {

            setPurchaseData(emptyPurchase);

        }

    }, [purchase]);

    const handlePurchaseChange = (e) => {

        setPurchaseData({
            ...purchaseData,
            [e.target.name]:
                e.target.value,
        });

    };

    const addItem = () => {

        setPurchaseData({
            ...purchaseData,
            items: [
                ...purchaseData.items,
                {
                    product: "",
                    quantity: 1,
                    rate: 0,
                    amount: 0,
                },
            ],
        });

    };

    const updateItem = (
        index,
        field,
        value
    ) => {

        const items = [...purchaseData.items];

        items[index][field] = value;

        items[index].amount =
            Number(items[index].quantity) *
            Number(items[index].rate);

        setPurchaseData({
            ...purchaseData,
            items,
        });

    };

    const removeItem = (index) => {

        const items =
            purchaseData.items.filter(
                (_, i) => i !== index
            );

        setPurchaseData({
            ...purchaseData,
            items,
        });

    };

    const total = purchaseData.items.reduce(
        (sum, item) =>
            sum + Number(item.amount),
        0
    );

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
            size="xl"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Purchase Entry

                </Modal.Title>

            </Modal.Header>

            <Form
                onSubmit={(e) => {

                    e.preventDefault();

                    onSubmit({
                        ...purchaseData,
                        total_amount: total,
                    });

                }}
            >

                <Modal.Body>

                    <div className="row mb-4">

                        <div className="col-md-4">

                            <Form.Label>
                                Supplier
                            </Form.Label>

                            <Form.Select
                                name="supplier"
                                value={purchaseData.supplier}
                                onChange={handlePurchaseChange}
                                style={inputStyle}
                            >

                                <option value="">
                                    Select Supplier
                                </option>

                                {masters.suppliers.map(
                                    (supplier) => (
                                        <option
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {supplier.name}
                                        </option>
                                    )
                                )}

                            </Form.Select>

                        </div>

                        <div className="col-md-4">

                            <Form.Label>
                                Invoice No
                            </Form.Label>

                            <Form.Control
                                name="invoice_no"
                                value={purchaseData.invoice_no}
                                onChange={handlePurchaseChange}
                                style={inputStyle}
                            />

                        </div>

                        <div className="col-md-4">

                            <Form.Label>
                                Purchase Date
                            </Form.Label>

                            <Form.Control
                                type="date"
                                name="purchase_date"
                                value={purchaseData.purchase_date}
                                onChange={handlePurchaseChange}
                                style={inputStyle}
                            />

                        </div>

                    </div>

                    <Table bordered hover>

                        <thead>

                            <tr>

                                <th>Product</th>

                                <th width="120">
                                    Qty
                                </th>

                                <th width="150">
                                    Rate
                                </th>

                                <th width="150">
                                    Amount
                                </th>

                                <th width="70">
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {purchaseData.items.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <tr
                                        key={index}
                                    >

                                        <td>

                                            <Form.Select
                                                value={item.product}
                                                onChange={(e) =>
                                                    updateItem(
                                                        index,
                                                        "product",
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option>
                                                    Select
                                                </option>

                                                {masters.products.map(
                                                    (
                                                        product
                                                    ) => (
                                                        <option
                                                            key={product.id}
                                                            value={product.id}
                                                        >
                                                            {product.name}
                                                        </option>
                                                    )
                                                )}

                                            </Form.Select>

                                        </td>

                                        <td>

                                            <Form.Control
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateItem(
                                                        index,
                                                        "quantity",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </td>

                                        <td>

                                            <Form.Control
                                                type="number"
                                                value={item.rate}
                                                onChange={(e) =>
                                                    updateItem(
                                                        index,
                                                        "rate",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </td>

                                        <td>

                                            {item.amount}

                                        </td>

                                        <td>

                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    removeItem(
                                                        index
                                                    )
                                                }
                                            >
                                                X
                                            </Button>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </Table>

                    <Button
                        onClick={addItem}
                    >
                        Add Item
                    </Button>

                    <h4 className="text-end mt-4">

                        Total : {total}

                    </h4>

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
                        Save Purchase
                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

}

export default PurchaseModal;