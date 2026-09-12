// src/pages/manufacturing/ManufacturingModal.jsx

import {
    useEffect,
    useState,
} from "react";

import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

import { COLORS } from "../../utils/colors";

function ManufacturingModal({
    show,
    onHide,
    onSubmit,
    order,
    masters,
    loading,
}) {

    const emptyForm = {
        product: "",
        quantity: 1,
        production_date: "",
        supervisor: "",
        status: "Pending",
        remarks: "",
    };

    const [formData, setFormData] =
        useState(emptyForm);

    useEffect(() => {

        if (order) {

            setFormData(order);

        } else {

            setFormData(emptyForm);

        }

    }, [order]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });

    };

    const inputStyle = {
        background:
            COLORS.inputBackground,
        color:
            COLORS.text,
        border: `1px solid ${COLORS.border}`,
    };

    return (

        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
        >

            <Modal.Header closeButton>

                <Modal.Title>

                    Manufacturing Order

                </Modal.Title>

            </Modal.Header>

            <Form
                onSubmit={(e) => {

                    e.preventDefault();

                    onSubmit(formData);

                }}
            >

                <Modal.Body>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Product
                            </Form.Label>

                            <Form.Select
                                name="product"
                                value={formData.product}
                                onChange={handleChange}
                                style={inputStyle}
                            >

                                <option value="">
                                    Select Product
                                </option>

                                {masters.products.map(
                                    (
                                        product
                                    ) => (

                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {
                                                product.name
                                            }
                                        </option>

                                    )
                                )}

                            </Form.Select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Quantity
                            </Form.Label>

                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                style={inputStyle}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Production Date
                            </Form.Label>

                            <Form.Control
                                type="date"
                                name="production_date"
                                value={formData.production_date}
                                onChange={handleChange}
                                style={inputStyle}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Supervisor
                            </Form.Label>

                            <Form.Select
                                name="supervisor"
                                value={formData.supervisor}
                                onChange={handleChange}
                                style={inputStyle}
                            >

                                <option value="">
                                    Select Supervisor
                                </option>

                                {masters.employees.map(
                                    (
                                        employee
                                    ) => (

                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {
                                                employee.name
                                            }
                                        </option>

                                    )
                                )}

                            </Form.Select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <Form.Label>
                                Status
                            </Form.Label>

                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                style={inputStyle}
                            >

                                <option>
                                    Pending
                                </option>

                                <option>
                                    In Progress
                                </option>

                                <option>
                                    Completed
                                </option>

                            </Form.Select>

                        </div>

                        <div className="col-12">

                            <Form.Label>
                                Remarks
                            </Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                style={inputStyle}
                            />

                        </div>

                    </div>

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
                        Save Order
                    </Button>

                </Modal.Footer>

            </Form>

        </Modal>

    );

}

export default ManufacturingModal;