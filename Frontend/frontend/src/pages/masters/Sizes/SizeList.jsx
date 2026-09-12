// src/pages/masters/sizes/SizeList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import SizeModal from "./SizeModal";

import {
    getSizes,
    createSize,
    updateSize,
    deleteSize,
} from "./SizeService";

import { toast } from "react-toastify";

function SizeList() {

    const [sizes, setSizes] = useState([]);

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [selectedSize, setSelectedSize] =
        useState(null);

    const fetchSizes = async () => {

        try {

            setLoading(true);

            const data = await getSizes(
                page,
                search
            );

            setSizes(data.results);

            setCount(data.count);

        } catch {

            toast.error(
                "Failed to load sizes."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchSizes();

    }, [page, search]);

    const handleSave = async (formData) => {

        try {

            setLoading(true);

            if (selectedSize) {

                await updateSize(
                    selectedSize.id,
                    formData
                );

                toast.success(
                    "Size Updated Successfully"
                );

            } else {

                await createSize(formData);

                toast.success(
                    "Size Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedSize(null);

            fetchSizes();

        } catch (error) {

            toast.error(
                error.response?.data?.name?.[0] ||
                    "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Delete this size?"
            )
        )
            return;

        try {

            await deleteSize(id);

            toast.success(
                "Size Deleted Successfully"
            );

            fetchSizes();

        } catch {

            toast.error(
                "Unable to delete size."
            );

        }

    };

    const totalPages = Math.ceil(count / 10);

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>Sizes</h3>

                    <small>
                        Manage Sizes
                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedSize(null);

                        setShowModal(true);

                    }}
                >
                    Add Size
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Size..."
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

                        <th>Created</th>

                        <th width="180">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {loading ? (

                        <tr>

                            <td
                                colSpan="3"
                                className="text-center"
                            >
                                Loading...
                            </td>

                        </tr>

                    ) : sizes.length === 0 ? (

                        <tr>

                            <td
                                colSpan="3"
                                className="text-center"
                            >
                                No Sizes Found
                            </td>

                        </tr>

                    ) : (

                        sizes.map((size) => (

                            <tr key={size.id}>

                                <td>{size.name}</td>

                                <td>
                                    {new Date(
                                        size.created_at
                                    ).toLocaleDateString()}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {

                                            setSelectedSize(size);

                                            setShowModal(true);

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(size.id)
                                        }
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
                    onClick={() =>
                        setPage(page - 1)
                    }
                >
                    Previous
                </button>

                <button
                    className="btn btn-secondary"
                    disabled={page >= totalPages}
                    onClick={() =>
                        setPage(page + 1)
                    }
                >
                    Next
                </button>

            </div>

            <SizeModal
                show={showModal}
                onHide={() => {

                    setShowModal(false);

                    setSelectedSize(null);

                }}
                size={selectedSize}
                onSubmit={handleSave}
                loading={loading}
            />

        </DashboardLayout>

    );
}

export default SizeList;