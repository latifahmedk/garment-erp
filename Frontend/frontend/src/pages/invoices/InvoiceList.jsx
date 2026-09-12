// src/pages/invoices/InvoiceList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import StatusBadge from "../../components/StatusBadge";
import InvoiceModal from "./InvoiceModal";
import { COLORS } from "../../utils/colors";

import {
    getInvoices,
    getSalesOrders,
    createInvoice,
    updateInvoice,
    deleteInvoice,
} from "./InvoiceService";

import { toast } from "react-toastify";

function InvoiceList() {
    const [invoices, setInvoices] = useState([]);
    const [salesOrders, setSalesOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const data = await getInvoices(page, search);
            setInvoices(data.results || data || []);
            setCount(data.count || (data.results ? data.results.length : 0));
        } catch {
            toast.error("Unable to load invoices.");
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const data = await getSalesOrders();
            setSalesOrders(data);
        } catch {
            // non-fatal
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [page, search]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            if (selectedInvoice) {
                await updateInvoice(selectedInvoice.id, formData);
                toast.success("Invoice updated successfully.");
            } else {
                await createInvoice(formData);
                toast.success("Invoice created successfully.");
            }
            setShowModal(false);
            fetchInvoices();
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to save invoice.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this invoice?")) return;
        try {
            await deleteInvoice(id);
            toast.success("Invoice deleted successfully.");
            fetchInvoices();
        } catch {
            toast.error("Unable to delete invoice.");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PAID":
                return COLORS.success;
            case "PARTIAL":
                return COLORS.warning;
            case "PENDING":
                return COLORS.info;
            case "CANCELLED":
                return COLORS.danger;
            default:
                return COLORS.textSecondary;
        }
    };

    return (
        <DashboardLayout>
            <div className="container-fluid">
                <PageHeader
                    title="Invoices"
                    subtitle="Manage sales invoices, tracking, and balance status"
                    buttonText="+ Create Invoice"
                    onButtonClick={() => {
                        setSelectedInvoice(null);
                        setShowModal(true);
                    }}
                />

                <div
                    style={{
                        background: COLORS.card,
                        borderRadius: 16,
                        border: `1px solid ${COLORS.border}`,
                        padding: 20,
                        marginTop: 20,
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                        <div style={{ maxWidth: 350, width: "100%" }}>
                            <SearchBar
                                value={search}
                                onChange={(val) => {
                                    setSearch(val);
                                    setPage(1);
                                }}
                                placeholder="Search by invoice # or customer..."
                            />
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table
                            className="table align-middle"
                            style={{
                                color: COLORS.text,
                                borderColor: COLORS.border,
                            }}
                        >
                            <thead>
                                <tr style={{ background: COLORS.tableHeader }}>
                                    <th>Invoice #</th>
                                    <th>Sales Order</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Due Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Balance</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="10" className="text-center py-4 text-muted">
                                            Loading invoices...
                                        </td>
                                    </tr>
                                ) : invoices.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="text-center py-4 text-muted">
                                            No invoices found.
                                        </td>
                                    </tr>
                                ) : (
                                    invoices.map((inv) => (
                                        <tr key={inv.id} style={{ background: COLORS.tableRow }}>
                                            <td className="fw-semibold">{inv.invoice_number}</td>
                                            <td>{inv.order_number || `#${inv.sales_order}`}</td>
                                            <td>{inv.customer_name || "—"}</td>
                                            <td>{inv.invoice_date}</td>
                                            <td>{inv.due_date}</td>
                                            <td>${Number(inv.total_amount || 0).toLocaleString()}</td>
                                            <td style={{ color: COLORS.success }}>
                                                ${Number(inv.paid_amount || 0).toLocaleString()}
                                            </td>
                                            <td style={{ color: Number(inv.balance_amount) > 0 ? COLORS.danger : COLORS.textSecondary }}>
                                                ${Number(inv.balance_amount || 0).toLocaleString()}
                                            </td>
                                            <td>
                                                <StatusBadge
                                                    text={inv.status}
                                                    color={getStatusColor(inv.status)}
                                                />
                                            </td>
                                            <td className="text-end">
                                                <button
                                                    className="btn btn-sm btn-outline-light me-2"
                                                    onClick={() => {
                                                        setSelectedInvoice(inv);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <i className="bi bi-pencil" />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(inv.id)}
                                                >
                                                    <i className="bi bi-trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        currentPage={page}
                        totalCount={count}
                        pageSize={10}
                        onPageChange={setPage}
                    />
                </div>

                <InvoiceModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    onSubmit={handleSave}
                    invoice={selectedInvoice}
                    salesOrders={salesOrders}
                    loading={loading}
                />
            </div>
        </DashboardLayout>
    );
}

export default InvoiceList;
