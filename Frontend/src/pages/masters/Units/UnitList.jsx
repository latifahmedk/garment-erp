// src/pages/masters/units/UnitList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import UnitModal from "./UnitModal";

import {
    getUnits,
    createUnit,
    updateUnit,
    deleteUnit,
} from "./UnitService";

import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/errorHelper";

function UnitList() {
    const [units, setUnits] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [selectedUnit, setSelectedUnit] =
        useState(null);

    const fetchUnits = async () => {
        try {
            setLoading(true);

            const data = await getUnits(
                page,
                search
            );

            setUnits(data?.results || []);
            setCount(data?.count || 0);
        } catch (error) {
            toast.error(
                getErrorMessage(error, "Failed to load units.")
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnits();
    }, [page, search]);

    const handleSave = async (formData) => {
        try {
            setLoading(true);

            if (selectedUnit) {
                await updateUnit(
                    selectedUnit.id,
                    formData
                );

                toast.success(
                    "Unit Updated Successfully"
                );
            } else {
                await createUnit(formData);

                toast.success(
                    "Unit Created Successfully"
                );
            }

            setShowModal(false);
            setSelectedUnit(null);

            fetchUnits();
        } catch (error) {
            toast.error(
                getErrorMessage(error, "Failed to save unit.")
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Delete this unit?"
            )
        )
            return;

        try {
            await deleteUnit(id);

            toast.success(
                "Unit Deleted Successfully"
            );

            fetchUnits();
        } catch (error) {
            toast.error(
                getErrorMessage(error, "Unable to delete unit.")
            );
        }
    };

    const totalPages = Math.ceil(count / 10);

    return (
        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>Units</h3>

                    <small>
                        Manage Units
                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedUnit(null);
                        setShowModal(true);
                    }}
                >
                    Add Unit
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Unit..."
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
                    ) : units.length ===
                      0 ? (
                        <tr>

                            <td
                                colSpan="3"
                                className="text-center"
                            >
                                No Units Found
                            </td>

                        </tr>
                    ) : (
                        units.map((unit) => (
                            <tr
                                key={unit.id}
                            >
                                <td>
                                    {
                                        unit.name
                                    }
                                </td>

                                <td>
                                    {new Date(
                                        unit.created_at
                                    ).toLocaleDateString()}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {
                                            setSelectedUnit(
                                                unit
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
                                                unit.id
                                            )
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

            <UnitModal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setSelectedUnit(null);
                }}
                unit={selectedUnit}
                onSubmit={handleSave}
                loading={loading}
            />

        </DashboardLayout>
    );
}

export default UnitList;