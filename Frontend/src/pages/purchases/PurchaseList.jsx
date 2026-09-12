// src/pages/purchases/PurchaseList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import PurchaseModal from "./PurchaseModal";
import {
    getPurchases,
    getPurchaseMasters,
    createPurchase,
    updatePurchase,
    deletePurchase,
} from "./PurchaseService";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/errorHelper";

function PurchaseList() {
    const [purchases, setPurchases] = useState([]);
    const [masters, setMasters] = useState({
        suppliers: [],
        products: [],
    });
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const fetchPurchases = async () => {
        try {
            setLoading(true);
            const data = await getPurchases(page, search);
            setPurchases(data?.results || []);
            setCount(data?.count || 0);
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to load purchases."));
        } finally {
            setLoading(false);
        }
    };

    const fetchMasters = async () => {
        try {
            const data = await getPurchaseMasters();
            setMasters(data);
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to load master data."));
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, [page, search]);

    useEffect(() => {
        fetchMasters();
    }, []);

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            if (selectedPurchase) {
                await updatePurchase(selectedPurchase.id, formData);
                toast.success("Purchase Updated Successfully");
            } else {
                await createPurchase(formData);
                toast.success("Purchase Created Successfully");
            }
            setShowModal(false);
            setSelectedPurchase(null);
            fetchPurchases();
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to save purchase."));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this purchase order?")) return;
        try {
            await deletePurchase(id);
            toast.success("Purchase Deleted Successfully");
            fetchPurchases();
        } catch (error) {
            toast.error(getErrorMessage(error, "Unable to delete purchase."));
        }
    };

    const totalPages = Math.ceil(count / 10);

    const getStatusBadge = (status) => {
        switch (status) {
            case "RECEIVED":
                return <span className="badge bg-success">Received</span>;
            case "ORDERED":
                return <span className="badge bg-primary">Ordered</span>;
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
                    <h3>Purchase Orders</h3>
                    <small>Manage Raw Materials and Goods Procurement</small>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedPurchase(null);
                        setShowModal(true);
                    }}
                >
                    + New Purchase
                </button>
            </div>

            <input
                className="form-control mb-4"
                placeholder="Search PO Number / Supplier..."
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
                        <th>Supplier</th>
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
                    ) : purchases.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                                No Purchases Found. Click <strong>+ New Purchase</strong> to create one.
                            </td>
                        </tr>
                    ) : (
                        purchases.map((purchase) => (
                            <tr key={purchase.id}>
                                <td className="fw-semibold">
                                    {purchase.order_number || purchase.invoice_no || `PO-#${purchase.id}`}
                                </td>
                                <td>{purchase.supplier_name || "-"}</td>
                                <td>
                                    {purchase.order_date
                                        ? new Date(purchase.order_date).toLocaleDateString()
                                        : "-"}
                                </td>
                                <td>{getStatusBadge(purchase.status)}</td>
                                <td className="text-success fw-bold">
                                    ₹{Number(purchase.total_amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {
                                            setSelectedPurchase(purchase);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(purchase.id)}
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

            <PurchaseModal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setSelectedPurchase(null);
                }}
                purchase={selectedPurchase}
                masters={masters}
                onSubmit={handleSave}
                loading={loading}
            />
        </DashboardLayout>
    );
}

export default PurchaseList;