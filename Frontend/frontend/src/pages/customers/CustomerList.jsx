// src/pages/customers/CustomerList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import CustomerModal from "./CustomerModal";

import {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from "./CustomerService";

import { toast } from "react-toastify";

function CustomerList() {

    const [customers, setCustomers] =
        useState([]);

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const [search, setSearch] = useState("");

    const [loading, setLoading] =
        useState(false);

    const [showModal, setShowModal] =
        useState(false);

    const [selectedCustomer, setSelectedCustomer] =
        useState(null);

    const fetchCustomers = async () => {

        try {

            setLoading(true);

            const data =
                await getCustomers(
                    page,
                    search
                );

            setCustomers(data.results);

            setCount(data.count);

        } catch {

            toast.error(
                "Unable to load customers."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCustomers();

    }, [page, search]);

    const handleSave = async (
        formData
    ) => {

        try {

            setLoading(true);

            if (selectedCustomer) {

                await updateCustomer(
                    selectedCustomer.id,
                    formData
                );

                toast.success(
                    "Customer Updated Successfully"
                );

            } else {

                await createCustomer(
                    formData
                );

                toast.success(
                    "Customer Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedCustomer(null);

            fetchCustomers();

        } catch {

            toast.error(
                "Something went wrong."
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
                "Delete this customer?"
            )
        )
            return;

        try {

            await deleteCustomer(id);

            toast.success(
                "Customer Deleted Successfully"
            );

            fetchCustomers();

        } catch {

            toast.error(
                "Unable to delete customer."
            );

        }

    };

    const totalPages = Math.ceil(
        count / 10
    );

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>Customers</h3>

                    <small>
                        Manage Customers
                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedCustomer(
                            null
                        );

                        setShowModal(true);

                    }}
                >
                    Add Customer
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Customer..."
                value={search}
                onChange={(e) => {

                    setSearch(
                        e.target.value
                    );

                    setPage(1);

                }}
            />

            <table className="table table-dark table-hover">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Type</th>

                        <th>Mobile</th>

                        <th>Email</th>

                        <th>Credit</th>

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

                    ) : customers.length ===
                      0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Customers
                                Found
                            </td>

                        </tr>

                    ) : (

                        customers.map(
                            (
                                customer
                            ) => (

                                <tr
                                    key={
                                        customer.id
                                    }
                                >

                                    <td>
                                        {
                                            customer.name
                                        }
                                    </td>

                                    <td>
                                        {
                                            customer.customer_type
                                        }
                                    </td>

                                    <td>
                                        {
                                            customer.mobile
                                        }
                                    </td>

                                    <td>
                                        {
                                            customer.email
                                        }
                                    </td>

                                    <td>
                                        {
                                            customer.credit_limit
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {

                                                setSelectedCustomer(
                                                    customer
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
                                                    customer.id
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
                    disabled={page === 1}
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
                        page >= totalPages
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

            <CustomerModal
                show={showModal}
                onHide={() => {

                    setShowModal(false);

                    setSelectedCustomer(
                        null
                    );

                }}
                onSubmit={handleSave}
                customer={
                    selectedCustomer
                }
                loading={loading}
            />

        </DashboardLayout>

    );

}

export default CustomerList;