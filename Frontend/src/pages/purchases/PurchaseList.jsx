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

function PurchaseList() {

    const [purchases, setPurchases] =
        useState([]);

    const [masters, setMasters] =
        useState({
            suppliers: [],
            products: [],
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

    const [selectedPurchase, setSelectedPurchase] =
        useState(null);

    const fetchPurchases = async () => {

        try {

            setLoading(true);

            const data =
                await getPurchases(
                    page,
                    search
                );

            setPurchases(data.results);

            setCount(data.count);

        } catch {

            toast.error(
                "Unable to load purchases."
            );

        } finally {

            setLoading(false);

        }

    };

    const fetchMasters = async () => {

        try {

            const data =
                await getPurchaseMasters();

            setMasters(data);

        } catch {

            toast.error(
                "Unable to load master data."
            );

        }

    };

    useEffect(() => {

        fetchPurchases();

    }, [page, search]);

    useEffect(() => {

        fetchMasters();

    }, []);

    const handleSave = async (
        formData
    ) => {

        try {

            setLoading(true);

            if (selectedPurchase) {

                await updatePurchase(
                    selectedPurchase.id,
                    formData
                );

                toast.success(
                    "Purchase Updated Successfully"
                );

            } else {

                await createPurchase(
                    formData
                );

                toast.success(
                    "Purchase Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedPurchase(null);

            fetchPurchases();

        } catch {

            toast.error(
                "Unable to save purchase."
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
                "Delete this purchase?"
            )
        )
            return;

        try {

            await deletePurchase(id);

            toast.success(
                "Purchase Deleted Successfully"
            );

            fetchPurchases();

        } catch {

            toast.error(
                "Unable to delete purchase."
            );

        }

    };

    const totalPages =
        Math.ceil(count / 10);

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>Purchase Entry</h3>

                    <small>

                        Manage Purchase Transactions

                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedPurchase(null);

                        setShowModal(true);

                    }}
                >
                    New Purchase
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Invoice / Supplier..."
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

                        <th>Invoice</th>

                        <th>Date</th>

                        <th>Supplier</th>

                        <th>Total</th>

                        <th width="180">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {loading ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center"
                            >
                                Loading...
                            </td>

                        </tr>

                    ) : purchases.length ===
                      0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center"
                            >
                                No Purchase Found
                            </td>

                        </tr>

                    ) : (

                        purchases.map(
                            (
                                purchase
                            ) => (

                                <tr
                                    key={
                                        purchase.id
                                    }
                                >

                                    <td>
                                        {
                                            purchase.invoice_no
                                        }
                                    </td>

                                    <td>
                                        {
                                            purchase.purchase_date
                                        }
                                    </td>

                                    <td>
                                        {
                                            purchase.supplier_name
                                        }
                                    </td>

                                    <td>
                                        $
                                        {
                                            purchase.total_amount
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {

                                                setSelectedPurchase(
                                                    purchase
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
                                                    purchase.id
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

            <PurchaseModal
                show={showModal}
                onHide={() => {

                    setShowModal(false);

                    setSelectedPurchase(null);

                }}
                purchase={
                    selectedPurchase
                }
                masters={masters}
                onSubmit={handleSave}
                loading={loading}
            />

        </DashboardLayout>

    );

}

export default PurchaseList;