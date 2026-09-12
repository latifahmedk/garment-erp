// src/pages/inventory/InventoryList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StockAdjustmentModal from "./StockAdjustmentModal";

import {
    getInventory,
    updateStock,
} from "./InventoryService";

import { toast } from "react-toastify";

function InventoryList() {

    const [inventory, setInventory] =
        useState([]);

    const [page, setPage] =
        useState(1);

    const [count, setCount] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [selectedStock, setSelectedStock] =
        useState(null);

    const [showModal, setShowModal] =
        useState(false);

    const fetchInventory = async () => {

        try {

            setLoading(true);

            const data =
                await getInventory(
                    page,
                    search
                );

            setInventory(
                data.results
            );

            setCount(
                data.count
            );

        } catch {

            toast.error(
                "Unable to load inventory."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchInventory();

    }, [page, search]);

    const handleUpdate = async (
        formData
    ) => {

        try {

            setLoading(true);

            await updateStock(
                selectedStock.id,
                formData
            );

            toast.success(
                "Stock Updated Successfully"
            );

            setShowModal(false);

            setSelectedStock(null);

            fetchInventory();

        } catch {

            toast.error(
                "Unable to update stock."
            );

        } finally {

            setLoading(false);

        }

    };

    const totalPages =
        Math.ceil(count / 10);

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>

                        Inventory

                    </h3>

                    <small>

                        Current Product Stock

                    </small>

                </div>

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

                        <th>SKU</th>

                        <th>Product</th>

                        <th>Category</th>

                        <th>Stock</th>

                        <th>Status</th>

                        <th width="150">

                            Action

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

                    ) : inventory.length ===
                      0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Inventory Found
                            </td>

                        </tr>

                    ) : (

                        inventory.map(
                            (item) => (

                                <tr
                                    key={
                                        item.id
                                    }
                                >

                                    <td>

                                        {
                                            item.sku
                                        }

                                    </td>

                                    <td>

                                        {
                                            item.product_name
                                        }

                                    </td>

                                    <td>

                                        {
                                            item.category_name
                                        }

                                    </td>

                                    <td>

                                        {
                                            item.stock_quantity
                                        }

                                    </td>

                                    <td>

                                        {item.stock_quantity <=
                                        10 ? (

                                            <span className="badge bg-danger">

                                                Low Stock

                                            </span>

                                        ) : (

                                            <span className="badge bg-success">

                                                Available

                                            </span>

                                        )}

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => {

                                                setSelectedStock(
                                                    item
                                                );

                                                setShowModal(
                                                    true
                                                );

                                            }}
                                        >
                                            Adjust
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

            <StockAdjustmentModal
                show={showModal}
                onHide={() => {

                    setShowModal(false);

                    setSelectedStock(
                        null
                    );

                }}
                inventory={
                    selectedStock
                }
                onSubmit={
                    handleUpdate
                }
                loading={loading}
            />

        </DashboardLayout>

    );

}

export default InventoryList;