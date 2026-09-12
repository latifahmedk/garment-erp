// src/pages/payments/PaymentList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import StatusBadge from "../../components/StatusBadge";
import PaymentModal from "./PaymentModal";
import { COLORS } from "../../utils/colors";

import {
    getPayments,
    getInvoicesForPayment,
    createPayment,
    updatePayment,
    deletePayment,
} from "./PaymentService";

import { toast } from "react-toastify";

function PaymentList() {
    const [payments, setPayments] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const data = await getPayments(page, search);
            setPayments(data.results || data || []);
            setCount(data.count || (data.results ? data.results.length : 0));
        } catch {
            toast.error("Unable to load payments.");
        } finally {
            setLoading(false);
        }
    };

    const fetchInvoices = async () => {
        try {
            const data = await getInvoicesForPayment();
            setInvoices(data);
        } catch {
            // non-fatal
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [page, search]);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            if (selectedPayment) {
                await updatePayment(selectedPayment.id, formData);
                toast.success("Payment updated successfully.");
            } else {
                await createPayment(formData);
                toast.success("Payment recorded successfully.");
            }
            setShowModal(false);
            fetchPayments();
            fetchInvoices();
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to save payment.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this payment record?")) return;
        try {
            await deletePayment(id);
            toast.success("Payment deleted successfully.");
            fetchPayments();
            fetchInvoices();
        } catch {
            toast.error("Unable to delete payment.");
        }
    };

    const getMethodColor = (method) => {
        switch (method) {
            case "UPI":
                return COLORS.info;
            case "BANK":
                return "#6F42C1";
            case "CARD":
                return COLORS.warning;
            case "CASH":
                return COLORS.success;
            default:
                return COLORS.textSecondary;
        }
    };

    return (
        <DashboardLayout>
            <div className="container-fluid">
                <PageHeader
                    title="Payments"
                    subtitle="Track customer receipts and invoice settlement records"
                    buttonText="+ Record Payment"
                    onButtonClick={() => {
                        setSelectedPayment(null);
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
                                placeholder="Search payments..."
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
                                    <th>Customer</th>
                                    <th>Payment Date</th>
                                    <th>Method</th>
                                    <th>Reference #</th>
                                    <th>Amount</th>
                                    <th>Remarks</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-muted">
                                            Loading payments...
                                        </td>
                                    </tr>
                                ) : payments.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-muted">
                                            No payment records found.
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((p) => (
                                        <tr key={p.id} style={{ background: COLORS.tableRow }}>
                                            <td className="fw-semibold">{p.invoice_number || `#${p.invoice}`}</td>
                                            <td>{p.customer_name || "—"}</td>
                                            <td>{p.payment_date}</td>
                                            <td>
                                                <StatusBadge
                                                    text={p.payment_method}
                                                    color={getMethodColor(p.payment_method)}
                                                />
                                            </td>
                                            <td>{p.reference_number || "—"}</td>
                                            <td className="fw-bold" style={{ color: COLORS.success }}>
                                                ${Number(p.amount || 0).toLocaleString()}
                                            </td>
                                            <td className="text-muted">{p.remarks || "—"}</td>
                                            <td className="text-end">
                                                <button
                                                    className="btn btn-sm btn-outline-light me-2"
                                                    onClick={() => {
                                                        setSelectedPayment(p);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    <i className="bi bi-pencil" />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(p.id)}
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

                <PaymentModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    onSubmit={handleSave}
                    payment={selectedPayment}
                    invoices={invoices}
                    loading={loading}
                />
            </div>
        </DashboardLayout>
    );
}

export default PaymentList;
