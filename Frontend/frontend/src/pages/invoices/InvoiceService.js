// src/pages/invoices/InvoiceService.js

import api from "../../api/axios";

export const getInvoices = async (page = 1, search = "") => {
    const response = await api.get("invoices/", {
        params: {
            page,
            search,
        },
    });
    return response.data;
};

export const getSalesOrders = async () => {
    const response = await api.get("sales/");
    return response.data?.results || response.data || [];
};

export const createInvoice = async (data) => {
    const response = await api.post("invoices/", data);
    return response.data;
};

export const updateInvoice = async (id, data) => {
    const response = await api.put(`invoices/${id}/`, data);
    return response.data;
};

export const deleteInvoice = async (id) => {
    await api.delete(`invoices/${id}/`);
};
