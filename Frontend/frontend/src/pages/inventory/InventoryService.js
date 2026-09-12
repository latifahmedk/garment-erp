// src/pages/inventory/InventoryService.js

import api from "../../api/axios";

export const getInventory = async (
    page = 1,
    search = ""
) => {
    const response = await api.get("inventory/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const getLowStock = async () => {
    const response = await api.get(
        "inventory/low-stock/"
    );

    return response.data;
};

export const getStockLedger = async (
    productId
) => {
    const response = await api.get(
        `inventory/${productId}/ledger/`
    );

    return response.data;
};

export const updateStock = async (
    id,
    data
) => {
    const response = await api.put(
        `inventory/${id}/`,
        data
    );

    return response.data;
};