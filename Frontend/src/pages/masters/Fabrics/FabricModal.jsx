// src/pages/masters/fabrics/FabricModal.jsx

import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { COLORS } from "../../../utils/colors";

function FabricModal({
    show,
    onHide,
    onSubmit,
    fabric,
    loading,
}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (fabric) {
            setName(fabric.name || "");
        } else {
            setName("");
        }
        setError("");
    }, [fabric, show]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Fabric name is required.");
            return;
        }

        setError("");
        onSubmit({
            name: name.trim(),
        });
    };

    const handleClose = () => {
        setError("");
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {fabric ? "Edit Fabric" : "Add Fabric"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>
                            Fabric Name <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            value={name}
                            isInvalid={!!error}
                            placeholder="e.g. 100% Cotton, Denim, Polyester..."
                            autoFocus
                            onChange={(e) => {
                                setName(e.target.value);
                                if (error) setError("");
                            }}
                            style={{
                                background:
                                    COLORS.inputBackground,
                                color: COLORS.text,
                                border: `1px solid ${error ? "#dc3545" : COLORS.border}`,
                            }}
                        />

                        {error && (
                            <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
                                {error}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
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
                        {loading
                            ? "Saving..."
                            : "Save"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default FabricModal;