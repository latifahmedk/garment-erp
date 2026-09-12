// src/pages/customers/CustomerService.js

import api from "../../api/axios";

export const getCustomers = async (
    page = 1,
    search = ""
) => {
    const response = await api.get("customers/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const createCustomer = async (data) => {
    const response = await api.post(
        "customers/",
        data
    );

    return response.data;
};

export const updateCustomer = async (
    id,
    data
) => {
    const response = await api.put(
        `customers/${id}/`,
        data
    );

    return response.data;
};

export const deleteCustomer = async (id) => {
    await api.delete(`customers/${id}/`);
};