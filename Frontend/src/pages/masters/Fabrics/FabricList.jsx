// src/pages/masters/fabrics/FabricList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import FabricModal from "./FabricModal";

import {
    getFabrics,
    createFabric,
    updateFabric,
    deleteFabric,
} from "./FabricService";

import { toast } from "react-toastify";

function FabricList() {

    const [fabrics, setFabrics] = useState([]);

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [selectedFabric, setSelectedFabric] =
        useState(null);

    const fetchFabrics = async () => {

        try {

            setLoading(true);

            const data = await getFabrics(
                page,
                search
            );

            setFabrics(data.results);

            setCount(data.count);

        } catch {

            toast.error(
                "Failed to load fabrics."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchFabrics();

    }, [page, search]);

    const handleSave = async (formData) => {

        try {

            setLoading(true);

            if (selectedFabric) {

                await updateFabric(
                    selectedFabric.id,
                    formData
                );

                toast.success(
                    "Fabric Updated Successfully"
                );

            } else {

                await createFabric(formData);

                toast.success(
                    "Fabric Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedFabric(null);

            fetchFabrics();

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
                "Delete this fabric?"
            )
        )
            return;

        try {

            await deleteFabric(id);

            toast.success(
                "Fabric Deleted Successfully"
            );

            fetchFabrics();

        } catch {

            toast.error(
                "Unable to delete fabric."
            );

        }

    };

    const totalPages = Math.ceil(count / 10);

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>Fabrics</h3>

                    <small>
                        Manage Fabrics
                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedFabric(null);

                        setShowModal(true);

                    }}
                >
                    Add Fabric
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Fabric..."
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

                    ) : fabrics.length === 0 ? (

                        <tr>

                            <td
                                colSpan="3"
                                className="text-center"
                            >
                                No Fabrics Found
                            </td>

                        </tr>

                    ) : (

                        fabrics.map((fabric) => (

                            <tr key={fabric.id}>

                                <td>{fabric.name}</td>

                                <td>
                                    {new Date(
                                        fabric.created_at
                                    ).toLocaleDateString()}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {

                                            setSelectedFabric(fabric);

                                            setShowModal(true);

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            handleDelete(fabric.id)
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

            <FabricModal
                show={showModal}
                onHide={() => {

                    setShowModal(false);

                    setSelectedFabric(null);

                }}
                fabric={selectedFabric}
                onSubmit={handleSave}
                loading={loading}
            />

        </DashboardLayout>

    );
}

export default FabricList;