// src/pages/purchases/PurchaseService.js

import api from "../../api/axios";

export const getPurchases = async (
    page = 1,
    search = ""
) => {
    const response = await api.get("purchases/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const getPurchaseMasters = async () => {
    const [
        suppliers,
        products,
    ] = await Promise.all([
        api.get("suppliers/"),
        api.get("products/"),
    ]);

    return {
        suppliers: suppliers.data.results,
        products: products.data.results,
    };
};

export const createPurchase = async (data) => {
    const response = await api.post(
        "purchases/",
        data
    );

    return response.data;
};

export const updatePurchase = async (
    id,
    data
) => {
    const response = await api.put(
        `purchases/${id}/`,
        data
    );

    return response.data;
};

export const deletePurchase = async (id) => {
    await api.delete(`purchases/${id}/`);
};