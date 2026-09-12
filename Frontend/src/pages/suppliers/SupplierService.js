// src/pages/suppliers/SupplierService.js

import api from "../../api/axios";

export const getSuppliers = async (
    page = 1,
    search = ""
) => {
    const response = await api.get("suppliers/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const createSupplier = async (data) => {
    const response = await api.post(
        "suppliers/",
        data
    );

    return response.data;
};

export const updateSupplier = async (
    id,
    data
) => {
    const response = await api.put(
        `suppliers/${id}/`,
        data
    );

    return response.data;
};

export const deleteSupplier = async (id) => {
    await api.delete(`suppliers/${id}/`);
};