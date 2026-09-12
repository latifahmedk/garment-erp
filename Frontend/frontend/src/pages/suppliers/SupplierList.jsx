// src/pages/suppliers/SupplierList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import SupplierModal from "./SupplierModal";

import {
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
} from "./SupplierService";

import { toast } from "react-toastify";

function SupplierList() {

    const [suppliers, setSuppliers] =
        useState([]);

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const [search, setSearch] = useState("");

    const [loading, setLoading] =
        useState(false);

    const [showModal, setShowModal] =
        useState(false);

    const [selectedSupplier, setSelectedSupplier] =
        useState(null);

    const fetchSuppliers = async () => {

        try {

            setLoading(true);

            const data =
                await getSuppliers(
                    page,
                    search
                );

            setSuppliers(data.results);

            setCount(data.count);

        } catch {

            toast.error(
                "Unable to load suppliers."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchSuppliers();

    }, [page, search]);

    const handleSave = async (
        formData
    ) => {

        try {

            setLoading(true);

            if (selectedSupplier) {

                await updateSupplier(
                    selectedSupplier.id,
                    formData
                );

                toast.success(
                    "Supplier Updated Successfully"
                );

            } else {

                await createSupplier(
                    formData
                );

                toast.success(
                    "Supplier Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedSupplier(null);

            fetchSuppliers();

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
                "Delete this supplier?"
            )
        )
            return;

        try {

            await deleteSupplier(id);

            toast.success(
                "Supplier Deleted Successfully"
            );

            fetchSuppliers();

        } catch {

            toast.error(
                "Unable to delete supplier."
            );

        }

    };

    const totalPages =
        Math.ceil(count / 10);

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>Suppliers</h3>

                    <small>
                        Manage Suppliers
                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedSupplier(null);

                        setShowModal(true);

                    }}
                >
                    Add Supplier
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Supplier..."
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

                        <th>Contact</th>

                        <th>Mobile</th>

                        <th>Email</th>

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

                    ) : suppliers.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center"
                            >
                                No Suppliers Found
                            </td>

                        </tr>

                    ) : (

                        suppliers.map(
                            (
                                supplier
                            ) => (

                                <tr
                                    key={
                                        supplier.id
                                    }
                                >

                                    <td>
                                        {
                                            supplier.name
                                        }
                                    </td>

                                    <td>
                                        {
                                            supplier.contact_person
                                        }
                                    </td>

                                    <td>
                                        {
                                            supplier.mobile
                                        }
                                    </td>

                                    <td>
                                        {
                                            supplier.email
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {

                                                setSelectedSupplier(
                                                    supplier
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
                                                    supplier.id
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
                        setPage(page - 1)
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
                        setPage(page + 1)
                    }
                >
                    Next
                </button>

            </div>

            <SupplierModal
                show={showModal}
                onHide={() => {

                    setShowModal(false);

                    setSelectedSupplier(null);

                }}
                onSubmit={handleSave}
                supplier={selectedSupplier}
                loading={loading}
            />

        </DashboardLayout>

    );

}

export default SupplierList;