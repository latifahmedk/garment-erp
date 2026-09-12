import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import CategoryModal from "./CategoryModal";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "./CategoryService";

import { toast } from "react-toastify";

function CategoryList() {
    const [categories, setCategories] = useState([]);

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [selectedCategory, setSelectedCategory] =
        useState(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);

            const data = await getCategories(
                page,
                search
            );

            setCategories(data.results);

            setCount(data.count);
        } catch {
            toast.error(
                "Failed to load categories."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [page, search]);

    const handleSave = async (formData) => {
        try {
            setLoading(true);

            if (selectedCategory) {
                await updateCategory(
                    selectedCategory.id,
                    formData
                );

                toast.success(
                    "Category Updated Successfully"
                );
            } else {
                await createCategory(formData);

                toast.success(
                    "Category Created Successfully"
                );
            }

            setShowModal(false);

            setSelectedCategory(null);

            fetchCategories();
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
                "Delete this category?"
            )
        )
            return;

        try {
            await deleteCategory(id);

            toast.success(
                "Category Deleted Successfully"
            );

            fetchCategories();
        } catch {
            toast.error(
                "Unable to delete category."
            );
        }
    };

    const totalPages = Math.ceil(count / 10);

    return (
        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>Categories</h3>

                    <small>
                        Manage Categories
                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSelectedCategory(
                            null
                        );

                        setShowModal(true);
                    }}
                >
                    Add Category
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search..."
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
                    ) : categories.length ===
                      0 ? (
                        <tr>

                            <td
                                colSpan="3"
                                className="text-center"
                            >
                                No Categories
                            </td>

                        </tr>
                    ) : (
                        categories.map(
                            (
                                category
                            ) => (
                                <tr
                                    key={
                                        category.id
                                    }
                                >
                                    <td>
                                        {
                                            category.name
                                        }
                                    </td>

                                    <td>
                                        {new Date(
                                            category.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {
                                                setSelectedCategory(
                                                    category
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
                                                    category.id
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

            <CategoryModal
                show={showModal}
                onHide={() => {
                    setShowModal(false);

                    setSelectedCategory(
                        null
                    );
                }}
                category={selectedCategory}
                onSubmit={handleSave}
                loading={loading}
            />

        </DashboardLayout>
    );
}

export default CategoryList;