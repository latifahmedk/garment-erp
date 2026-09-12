// src/pages/inventory/StockAdjustmentModal.jsx

import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { COLORS } from "../../utils/colors";

function StockAdjustmentModal({
    show,
    onHide,
    inventory,
    onSubmit,
    loading,
}) {

    const [quantity, setQuantity] =
        useState("");

    useEffect(() => {

        if (inventory) {

            setQuantity(
                inventory.stock_quantity
            );

        }

    }, [inventory]);

    return (

        <Modal
            show={show}
            onHide={onHide}
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Stock Adjustment

                </Modal.Title>

            </Modal.Header>

            <Form
                onSubmit={(e) => {

                    e.preventDefault();

                    onSubmit({
                        stock_quantity:
                            quantity,
                    });

                }}
            >

                <Modal.Body>

                    <Form.Group>

                        <Form.Label>

                            Product

                        </Form.Label>

                        <Form.Control
                            value={
                                inventory?.product_name ||
                                ""
                            }
                            disabled
                        />

                    </Form.Group>

                    <Form.Group className="mt-3">

                        <Form.Label>

                            Available Stock

                        </Form.Label>

                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    e.target.value
                                )
                            }
                            style={{
                                background:
                                    COLORS.inputBackground,
                                color:
                                    COLORS.text,
                            }}
                        />

                    </Form.Group>

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
                        Update
                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

}

export default StockAdjustmentModal;