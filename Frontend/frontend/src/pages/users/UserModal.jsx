// src/pages/users/UserModal.jsx

import {
    useEffect,
    useState,
} from "react";

import {
    Modal,
    Form,
    Button,
} from "react-bootstrap";

function UserModal({
    show,
    onHide,
    user,
    roles,
    loading,
    onSubmit,
}) {
    const emptyForm = {
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        role: "",
        is_active: true,
    };

    const [formData, setFormData] =
        useState(emptyForm);

    useEffect(() => {
        if (user) {
            setFormData({
                ...user,
                password: "",
            });
        } else {
            setFormData(emptyForm);
        }
    }, [user]);

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
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
                    {user
                        ? "Edit User"
                        : "New User"}
                </Modal.Title>
            </Modal.Header>

            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }}
            >
                <Modal.Body>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            First Name
                        </Form.Label>

                        <Form.Control
                            name="first_name"
                            value={
                                formData.first_name
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Last Name
                        </Form.Label>

                        <Form.Control
                            name="last_name"
                            value={
                                formData.last_name
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Username
                        </Form.Label>

                        <Form.Control
                            name="username"
                            value={
                                formData.username
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Email
                        </Form.Label>

                        <Form.Control
                            type="email"
                            name="email"
                            value={
                                formData.email
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </Form.Group>

                    {!user && (
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Password
                            </Form.Label>

                            <Form.Control
                                type="password"
                                name="password"
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                            />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Role
                        </Form.Label>

                        <Form.Select
                            name="role"
                            value={
                                formData.role
                            }
                            onChange={
                                handleChange
                            }
                        >
                            <option value="">
                                Select Role
                            </option>

                            {roles.map(
                                (
                                    role
                                ) => (
                                    <option
                                        key={
                                            role.id
                                        }
                                        value={
                                            role.id
                                        }
                                    >
                                        {
                                            role.name
                                        }
                                    </option>
                                )
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Check
                        label="Active User"
                        name="is_active"
                        checked={
                            formData.is_active
                        }
                        onChange={
                            handleChange
                        }
                    />

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
                        Save
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UserModal;