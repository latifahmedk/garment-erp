// src/pages/manufacturing/ManufacturingList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ManufacturingModal from "./ManufacturingModal";

import {
    getManufacturingOrders,
    getManufacturingMasters,
    createManufacturingOrder,
    updateManufacturingOrder,
    deleteManufacturingOrder,
} from "./ManufacturingService";

import { toast } from "react-toastify";

function ManufacturingList() {

    const [orders, setOrders] =
        useState([]);

    const [masters, setMasters] =
        useState({
            products: [],
            employees: [],
        });

    const [page, setPage] =
        useState(1);

    const [count, setCount] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [showModal, setShowModal] =
        useState(false);

    const [selectedOrder, setSelectedOrder] =
        useState(null);

    const fetchOrders = async () => {

        try {

            setLoading(true);

            const data =
                await getManufacturingOrders(
                    page,
                    search
                );

            setOrders(data.results);

            setCount(data.count);

        } catch {

            toast.error(
                "Unable to load manufacturing orders."
            );

        } finally {

            setLoading(false);

        }

    };

    const fetchMasters = async () => {

        try {

            const data =
                await getManufacturingMasters();

            setMasters(data);

        } catch {

            toast.error(
                "Unable to load master data."
            );

        }

    };

    useEffect(() => {

        fetchOrders();

    }, [page, search]);

    useEffect(() => {

        fetchMasters();

    }, []);

    const handleSave = async (
        formData
    ) => {

        try {

            setLoading(true);

            if (selectedOrder) {

                await updateManufacturingOrder(
                    selectedOrder.id,
                    formData
                );

                toast.success(
                    "Manufacturing Order Updated Successfully"
                );

            } else {

                await createManufacturingOrder(
                    formData
                );

                toast.success(
                    "Manufacturing Order Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedOrder(null);

            fetchOrders();

        } catch {

            toast.error(
                "Unable to save manufacturing order."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (
        id
    ) => {

        if (
            !window.confirm(
                "Delete this manufacturing order?"
            )
        )
            return;

        try {

            await deleteManufacturingOrder(
                id
            );

            toast.success(
                "Manufacturing Order Deleted Successfully"
            );

            fetchOrders();

        } catch {

            toast.error(
                "Unable to delete manufacturing order."
            );

        }

    };

    const totalPages =
        Math.ceil(count / 10);

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>

                        Manufacturing Orders

                    </h3>

                    <small>

                        Manage Production Orders

                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedOrder(
                            null
                        );

                        setShowModal(
                            true
                        );

                    }}
                >
                    New Order
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Product..."
                value={search}
                onChange={(e) => {

                    setSearch(
                        e.target.value
                    );

                    setPage(1);

                }}
            />

            <table className="table table-dark table-hover align-middle">

                <thead>

                    <tr>

                        <th>

                            Product

                        </th>

                        <th>

                            Quantity

                        </th>

                        <th>

                            Date

                        </th>

                        <th>

                            Supervisor

                        </th>

                        <th>

                            Status

                        </th>

                        <th width="180">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {loading ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                Loading...
                            </td>

                        </tr>

                    ) : orders.length ===
                      0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Orders Found
                            </td>

                        </tr>

                    ) : (

                        orders.map(
                            (
                                order
                            ) => (

                                <tr
                                    key={
                                        order.id
                                    }
                                >

                                    <td>

                                        {
                                            order.product_name
                                        }

                                    </td>

                                    <td>

                                        {
                                            order.quantity
                                        }

                                    </td>

                                    <td>

                                        {
                                            order.production_date
                                        }

                                    </td>

                                    <td>

                                        {
                                            order.supervisor_name
                                        }

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                order.status ===
                                                "Completed"
                                                    ? "bg-success"
                                                    : order.status ===
                                                      "In Progress"
                                                    ? "bg-warning"
                                                    : "bg-secondary"
                                            }`}
                                        >

                                            {
                                                order.status
                                            }

                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {

                                                setSelectedOrder(
                                                    order
                                                );

                                                setShowModal(
                                                    true
                                                );

                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(
                                                    order.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )

                    )}

                </tbody>

            </table>

            <div className="d-flex justify-content-end gap-2">

                <button
                    className="btn btn-secondary"
                    disabled={
                        page === 1
                    }
                    onClick={() =>
                        setPage(
                            page - 1
                        )
                    }
                >
                    Previous
                </button>

                <button
                    className="btn btn-secondary"
                    disabled={
                        page >=
                        totalPages
                    }
                    onClick={() =>
                        setPage(
                            page + 1
                        )
                    }
                >
                    Next
                </button>

            </div>

            <ManufacturingModal
                show={showModal}
                onHide={() => {

                    setShowModal(
                        false
                    );

                    setSelectedOrder(
                        null
                    );

                }}
                order={
                    selectedOrder
                }
                masters={masters}
                onSubmit={
                    handleSave
                }
                loading={loading}
            />

        </DashboardLayout>

    );

}

export default ManufacturingList;