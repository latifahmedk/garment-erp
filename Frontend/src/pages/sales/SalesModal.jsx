// src/pages/sales/SalesModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button, Table } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function SalesModal({
    show,
    onHide,
    onSubmit,
    sale,
    masters,
    loading,
}) {

    const emptySale = {
        customer: "",
        invoice_no: "",
        sale_date: "",
        items: [],
    };

    const [saleData, setSaleData] =
        useState(emptySale);

    useEffect(() => {

        if (sale) {

            setSaleData(sale);

        } else {

            setSaleData(emptySale);

        }

    }, [sale]);

    const handleChange = (e) => {

        setSaleData({
            ...saleData,
            [e.target.name]:
                e.target.value,
        });

    };

    const addItem = () => {

        setSaleData({
            ...saleData,
            items: [
                ...saleData.items,
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

        const items = [...saleData.items];

        items[index][field] = value;

        items[index].amount =
            Number(items[index].quantity) *
            Number(items[index].rate);

        setSaleData({
            ...saleData,
            items,
        });

    };

    const removeItem = (index) => {

        const items =
            saleData.items.filter(
                (_, i) => i !== index
            );

        setSaleData({
            ...saleData,
            items,
        });

    };

    const total =
        saleData.items.reduce(
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
            centered
            size="xl"
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Sales Invoice

                </Modal.Title>

            </Modal.Header>

            <Form
                onSubmit={(e) => {

                    e.preventDefault();

                    onSubmit({
                        ...saleData,
                        total_amount: total,
                    });

                }}
            >

                <Modal.Body>

                    <div className="row mb-4">

                        <div className="col-md-4">

                            <Form.Label>

                                Customer

                            </Form.Label>

                            <Form.Select
                                name="customer"
                                value={saleData.customer}
                                onChange={handleChange}
                                style={inputStyle}
                            >

                                <option value="">
                                    Select Customer
                                </option>

                                {masters.customers.map(
                                    (
                                        customer
                                    ) => (

                                        <option
                                            key={
                                                customer.id
                                            }
                                            value={
                                                customer.id
                                            }
                                        >
                                            {
                                                customer.name
                                            }
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
                                value={saleData.invoice_no}
                                onChange={handleChange}
                                style={inputStyle}
                            />

                        </div>

                        <div className="col-md-4">

                            <Form.Label>

                                Sale Date

                            </Form.Label>

                            <Form.Control
                                type="date"
                                name="sale_date"
                                value={saleData.sale_date}
                                onChange={handleChange}
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

                                <th width="140">
                                    Rate
                                </th>

                                <th width="150">
                                    Amount
                                </th>

                                <th width="60"></th>

                            </tr>

                        </thead>

                        <tbody>

                            {saleData.items.map(
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
                                                            key={
                                                                product.id
                                                            }
                                                            value={
                                                                product.id
                                                            }
                                                        >
                                                            {
                                                                product.name
                                                            }
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
                                                size="sm"
                                                variant="danger"
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
                        Save Invoice
                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

}

export default SalesModal;