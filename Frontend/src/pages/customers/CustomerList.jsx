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
import { getErrorMessage } from "../../utils/errorHelper";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await getCustomers(page, search);
            setCustomers(data?.results || []);
            setCount(data?.count || 0);
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to load customers."));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [page, search]);

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            if (selectedCustomer) {
                await updateCustomer(selectedCustomer.id, formData);
                toast.success("Customer Updated Successfully");
            } else {
                await createCustomer(formData);
                toast.success("Customer Created Successfully");
            }
            setShowModal(false);
            setSelectedCustomer(null);
            fetchCustomers();
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to save customer."));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this customer?")) return;
        try {
            await deleteCustomer(id);
            toast.success("Customer Deleted Successfully");
            fetchCustomers();
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to delete customer."));
        }
    };

    const totalPages = Math.ceil(count / 10);

    return (
        <DashboardLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3>Customers</h3>
                    <small>Manage Retail and Wholesale Customers</small>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedCustomer(null);
                        setShowModal(true);
                    }}
                >
                    Add Customer
                </button>
            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Customer by name, phone, email, city..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Phone</th>
                        <th>City / State</th>
                        <th>GST Number</th>
                        <th width="180">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    ) : customers.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No Customers Found
                            </td>
                        </tr>
                    ) : (
                        customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            customer.customer_type === "WHOLESALE"
                                                ? "bg-info text-dark"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {customer.customer_type}
                                    </span>
                                </td>
                                <td>{customer.phone || customer.mobile || "-"}</td>
                                <td>
                                    {customer.city
                                        ? `${customer.city}${customer.state ? `, ${customer.state}` : ""}`
                                        : customer.state || "-"}
                                </td>
                                <td>{customer.gst_number || "-"}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {
                                            setSelectedCustomer(customer);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(customer.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-end gap-2">
                <button
                    className="btn btn-secondary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <button
                    className="btn btn-secondary"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>

            <CustomerModal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setSelectedCustomer(null);
                }}
                onSubmit={handleSave}
                customer={selectedCustomer}
                loading={loading}
            />
        </DashboardLayout>
    );
}

export default CustomerList;