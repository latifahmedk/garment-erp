// src/pages/sales/SalesService.js

import api from "../../api/axios";

export const getSales = async (
    page = 1,
    search = ""
) => {
    const response = await api.get("sales/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const getSalesMasters = async () => {
    const [
        customers,
        products,
    ] = await Promise.all([
        api.get("customers/"),
        api.get("products/"),
    ]);

    return {
        customers: customers.data?.results || customers.data || [],
        products: products.data?.results || products.data || [],
    };
};

export const createSale = async (data) => {
    const response = await api.post(
        "sales/",
        data
    );

    return response.data;
};

export const updateSale = async (
    id,
    data
) => {
    const response = await api.patch(
        `sales/${id}/`,
        data
    );

    return response.data;
};

export const deleteSale = async (id) => {

    await api.delete(`sales/${id}/`);

};