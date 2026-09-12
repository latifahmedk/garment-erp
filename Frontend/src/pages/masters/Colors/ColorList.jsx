// src/pages/masters/colors/ColorList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import ColorModal from "./ColorModal";

import {
    getColors,
    createColor,
    updateColor,
    deleteColor,
} from "./ColorService";

import { toast } from "react-toastify";

function ColorList() {

    const [colors, setColors] = useState([]);

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [selectedColor, setSelectedColor] =
        useState(null);

    const fetchColors = async () => {

        try {

            setLoading(true);

            const data = await getColors(
                page,
                search
            );

            setColors(data.results);

            setCount(data.count);

        } catch {

            toast.error(
                "Failed to load colors."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchColors();

    }, [page, search]);

    const handleSave = async (formData) => {

        try {

            setLoading(true);

            if (selectedColor) {

                await updateColor(
                    selectedColor.id,
                    formData
                );

                toast.success(
                    "Color Updated Successfully"
                );

            } else {

                await createColor(formData);

                toast.success(
                    "Color Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedColor(null);

            fetchColors();

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
                "Delete this color?"
            )
        )
            return;

        try {

            await deleteColor(id);

            toast.success(
                "Color Deleted Successfully"
            );

            fetchColors();

        } catch {

            toast.error(
                "Unable to delete color."
            );

        }

    };

    const totalPages = Math.ceil(count / 10);

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>Colors</h3>

                    <small>
                        Manage Colors
                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedColor(null);

                        setShowModal(true);

                    }}
                >
                    Add Color
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Color..."
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

                    ) : colors.length ===
                      0 ? (

                        <tr>

                            <td
                                colSpan="3"
                                className="text-center"
                            >
                                No Colors Found
                            </td>

                        </tr>

                    ) : (

                        colors.map((color) => (

                            <tr
                                key={color.id}
                            >

                                <td>
                                    {color.name}
                                </td>

                                <td>
                                    {new Date(
                                        color.created_at
                                    ).toLocaleDateString()}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {

                                            setSelectedColor(
                                                color
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
                                                color.id
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

            <ColorModal
                show={showModal}
                onHide={() => {

                    setShowModal(false);

                    setSelectedColor(null);

                }}
                color={selectedColor}
                onSubmit={handleSave}
                loading={loading}
            />

        </DashboardLayout>

    );
}

export default ColorList;