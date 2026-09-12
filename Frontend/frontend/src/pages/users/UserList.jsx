// src/pages/users/UserList.jsx

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import UserModal from "./UserModal";

import {
    getUsers,
    getRoles,
    createUser,
    updateUser,
    deleteUser,
} from "./UserService";

function UserList() {

    const [users, setUsers] =
        useState([]);

    const [roles, setRoles] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [page, setPage] =
        useState(1);

    const [count, setCount] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const [showModal, setShowModal] =
        useState(false);

    const [selectedUser, setSelectedUser] =
        useState(null);

    const fetchUsers = async () => {

        try {

            setLoading(true);

            const data =
                await getUsers(
                    page,
                    search
                );

            setUsers(
                data.results
            );

            setCount(
                data.count
            );

        } catch {

            toast.error(
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }

    };

    const fetchRoles = async () => {

        try {

            const data =
                await getRoles();

            setRoles(data);

        } catch {

            toast.error(
                "Unable to load roles."
            );

        }

    };

    useEffect(() => {

        fetchUsers();

    }, [page, search]);

    useEffect(() => {

        fetchRoles();

    }, []);

    const handleSave = async (
        formData
    ) => {

        try {

            setLoading(true);

            if (selectedUser) {

                await updateUser(
                    selectedUser.id,
                    formData
                );

                toast.success(
                    "User Updated Successfully"
                );

            } else {

                await createUser(
                    formData
                );

                toast.success(
                    "User Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedUser(null);

            fetchUsers();

        } catch {

            toast.error(
                "Unable to save user."
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
                "Delete this user?"
            )
        )
            return;

        try {

            await deleteUser(id);

            toast.success(
                "User Deleted Successfully"
            );

            fetchUsers();

        } catch {

            toast.error(
                "Unable to delete user."
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

                        Users

                    </h3>

                    <small>

                        User Management

                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedUser(
                            null
                        );

                        setShowModal(
                            true
                        );

                    }}
                >
                    Add User
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Users..."
                value={search}
                onChange={(e) => {

                    setSearch(
                        e.target.value
                    );

                    setPage(1);

                }}
            />

            <table className="table table-hover table-bordered align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>Name</th>

                        <th>Username</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Status</th>

                        <th width="170">

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

                    ) : users.length ===
                      0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Users Found
                            </td>

                        </tr>

                    ) : (

                        users.map(
                            (user) => (

                                <tr
                                    key={
                                        user.id
                                    }
                                >

                                    <td>

                                        {
                                            user.first_name
                                        }{" "}
                                        {
                                            user.last_name
                                        }

                                    </td>

                                    <td>

                                        {
                                            user.username
                                        }

                                    </td>

                                    <td>

                                        {
                                            user.email
                                        }

                                    </td>

                                    <td>

                                        {
                                            user.role_name
                                        }

                                    </td>

                                    <td>

                                        {user.is_active ? (

                                            <span className="badge bg-success">

                                                Active

                                            </span>

                                        ) : (

                                            <span className="badge bg-danger">

                                                Inactive

                                            </span>

                                        )}

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {

                                                setSelectedUser(
                                                    user
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
                                                    user.id
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

            <UserModal
                show={showModal}
                onHide={() => {

                    setShowModal(false);

                    setSelectedUser(
                        null
                    );

                }}
                user={selectedUser}
                roles={roles}
                loading={loading}
                onSubmit={handleSave}
            />

        </DashboardLayout>

    );

}

export default UserList;