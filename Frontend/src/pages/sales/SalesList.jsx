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

    const [selectedSale, setSelectedSale] =
        useState(null);

    const fetchSales = async () => {

        try {

            setLoading(true);

            const data = await getSales(
                page,
                search
            );

            setSales(data.results);

            setCount(data.count);

        } catch {

            toast.error(
                "Unable to load sales."
            );

        } finally {

            setLoading(false);

        }

    };

    const fetchMasters = async () => {

        try {

            const data =
                await getSalesMasters();

            setMasters(data);

        } catch {

            toast.error(
                "Unable to load master data."
            );

        }

    };

    useEffect(() => {

        fetchSales();

    }, [page, search]);

    useEffect(() => {

        fetchMasters();

    }, []);

    const handleSave = async (
        formData
    ) => {

        try {

            setLoading(true);

            if (selectedSale) {

                await updateSale(
                    selectedSale.id,
                    formData
                );

                toast.success(
                    "Sales Invoice Updated Successfully"
                );

            } else {

                await createSale(
                    formData
                );

                toast.success(
                    "Sales Invoice Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedSale(null);

            fetchSales();

        } catch {

            toast.error(
                "Unable to save sales invoice."
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
                "Delete this sales invoice?"
            )
        )
            return;

        try {

            await deleteSale(id);

            toast.success(
                "Sales Invoice Deleted Successfully"
            );

            fetchSales();

        } catch {

            toast.error(
                "Unable to delete invoice."
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
                        Sales Invoices
                    </h3>

                    <small>

                        Manage Sales Transactions

                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedSale(null);

                        setShowModal(true);

                    }}
                >
                    New Invoice
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Invoice / Customer..."
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

                        <th>Customer</th>

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

                    ) : sales.length ===
                      0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center"
                            >
                                No Sales Found
                            </td>

                        </tr>

                    ) : (

                        sales.map(
                            (
                                sale
                            ) => (

                                <tr
                                    key={
                                        sale.id
                                    }
                                >

                                    <td>
                                        {
                                            sale.invoice_no
                                        }
                                    </td>

                                    <td>
                                        {
                                            sale.sale_date
                                        }
                                    </td>

                                    <td>
                                        {
                                            sale.customer_name
                                        }
                                    </td>

                                    <td>
                                        $
                                        {
                                            sale.total_amount
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {

                                                setSelectedSale(
                                                    sale
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
                                                    sale.id
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