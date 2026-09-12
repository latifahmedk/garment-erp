// src/pages/users/UserService.js

import api from "../../api/axios";

export const getUsers = async (
    page = 1,
    search = ""
) => {
    const response = await api.get("users/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const createUser = async (
    data
) => {
    const response = await api.post(
        "users/",
        data
    );

    return response.data;
};

export const updateUser = async (
    id,
    data
) => {
    const response = await api.put(
        `users/${id}/`,
        data
    );

    return response.data;
};

export const deleteUser = async (
    id
) => {
    await api.delete(`users/${id}/`);
};

export const getRoles = async () => {
    const response = await api.get(
        "roles/"
    );

    return response.data;
};