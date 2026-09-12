// src/pages/masters/colors/ColorModal.jsx

import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { COLORS } from "../../../utils/colors";

function ColorModal({
    show,
    onHide,
    onSubmit,
    color,
    loading,
}) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (color) {
            setName(color.name);
        } else {
            setName("");
        }
    }, [color]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        onSubmit({
            name: name.trim(),
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {color ? "Edit Color" : "Add Color"}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>

                    <Form.Group>

                        <Form.Label>
                            Color Name
                        </Form.Label>

                        <Form.Control
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            style={{
                                background:
                                    COLORS.inputBackground,
                                color: COLORS.text,
                                border: `1px solid ${COLORS.border}`,
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
                        {loading
                            ? "Saving..."
                            : "Save"}
                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>
    );
}

export default ColorModal;