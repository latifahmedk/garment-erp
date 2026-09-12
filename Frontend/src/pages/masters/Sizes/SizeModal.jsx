// src/pages/masters/sizes/SizeModal.jsx

import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { COLORS } from "../../../utils/colors";

function SizeModal({
    show,
    onHide,
    onSubmit,
    size,
    loading,
}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (size) {
            setName(size.name || "");
        } else {
            setName("");
        }
        setError("");
    }, [size, show]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Size name is required.");
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
                    {size ? "Edit Size" : "Add Size"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>
                            Size Name <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            value={name}
                            isInvalid={!!error}
                            placeholder="e.g. S, M, L, XL, 32, 34..."
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

export default SizeModal;