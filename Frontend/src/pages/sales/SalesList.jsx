// src/pages/sales/SalesList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import SalesModal from "./SalesModal";
import {
    getSales,
    getSalesMasters,
    createSale,
    updateSale,
    deleteSale,
} from "./SalesService";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/errorHelper";

function SalesList() {
    const [sales, setSales] = useState([]);
    const [masters, setMasters] = useState({
        customers: [],
        products: [],
    });
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);

    const fetchSales = async () => {
        try {
            setLoading(true);
            const data = await getSales(page, search);
            setSales(data?.results || []);
            setCount(data?.count || 0);
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to load sales."));
        } finally {
            setLoading(false);
        }
    };

    const fetchMasters = async () => {
        try {
            const data = await getSalesMasters();
            setMasters(data);
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to load master data."));
        }
    };

    useEffect(() => {
        fetchSales();
    }, [page, search]);

    useEffect(() => {
        fetchMasters();
    }, []);

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            if (selectedSale) {
                await updateSale(selectedSale.id, formData);
                toast.success("Sales Order Updated Successfully");
            } else {
                await createSale(formData);
                toast.success("Sales Order Created Successfully");
            }
            setShowModal(false);
            setSelectedSale(null);
            fetchSales();
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to save sales order."));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this sales order?")) return;
        try {
            await deleteSale(id);
            toast.success("Sales Order Deleted Successfully");
            fetchSales();
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to delete sales order."));
        }
    };

    const totalPages = Math.ceil(count / 10);

    const getStatusBadge = (status) => {
        switch (status) {
            case "DELIVERED":
                return <span className="badge bg-success">Delivered</span>;
            case "CONFIRMED":
                return <span className="badge bg-primary">Confirmed</span>;
            case "CANCELLED":
                return <span className="badge bg-danger">Cancelled</span>;
            default:
                return <span className="badge bg-secondary">Draft</span>;
        }
    };

    return (
        <DashboardLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3>Sales Orders</h3>
                    <small>Manage Customer Orders and Outward Dispatches</small>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedSale(null);
                        setShowModal(true);
                    }}
                >
                    + New Sales Order
                </button>
            </div>

            <input
                className="form-control mb-4"
                placeholder="Search SO Number / Customer..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            <table className="table table-dark table-hover align-middle">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Customer</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                        <th width="180">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                Loading...
                            </td>
                        </tr>
                    ) : sales.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                                No Sales Orders Found. Click <strong>+ New Sales Order</strong> to create one.
                            </td>
                        </tr>
                    ) : (
                        sales.map((sale) => (
                            <tr key={sale.id}>
                                <td className="fw-semibold">
                                    {sale.order_number || sale.invoice_no || `SO-#${sale.id}`}
                                </td>
                                <td>{sale.customer_name || "-"}</td>
                                <td>
                                    {sale.order_date
                                        ? new Date(sale.order_date).toLocaleDateString()
                                        : "-"}
                                </td>
                                <td>{getStatusBadge(sale.status)}</td>
                                <td className="text-success fw-bold">
                                    ₹{Number(sale.total_amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {
                                            setSelectedSale(sale);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(sale.id)}
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

            <SalesModal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setSelectedSale(null);
                }}
                sale={selectedSale}
                masters={masters}
                onSubmit={handleSave}
                loading={loading}
            />
        </DashboardLayout>
    );
}

export default SalesList;