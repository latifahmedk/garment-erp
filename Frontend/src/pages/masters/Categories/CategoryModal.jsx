import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { COLORS } from "../../../utils/colors";

function CategoryModal({
    show,
    onHide,
    onSubmit,
    category,
    loading,
}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (category) {
            setName(category.name || "");
        } else {
            setName("");
        }
        setError("");
    }, [category, show]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Category name is required.");
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
                    {category ? "Edit Category" : "Add Category"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>
                            Category Name <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                            value={name}
                            isInvalid={!!error}
                            placeholder="e.g. Cotton Shirts, Jeans..."
                            autoFocus
                            onChange={(e) => {
                                setName(e.target.value);
                                if (error) setError("");
                            }}
                            style={{
                                background: COLORS.inputBackground,
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
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CategoryModal;