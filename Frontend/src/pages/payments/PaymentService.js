// src/pages/payments/PaymentService.js

import api from "../../api/axios";

export const getPayments = async (page = 1, search = "") => {
    const response = await api.get("payments/", {
        params: {
            page,
            search,
        },
    });
    return response.data;
};

export const getInvoicesForPayment = async () => {
    const response = await api.get("invoices/");
    return response.data?.results || response.data || [];
};

export const createPayment = async (data) => {
    const response = await api.post("payments/", data);
    return response.data;
};

export const updatePayment = async (id, data) => {
    const response = await api.put(`payments/${id}/`, data);
    return response.data;
};

export const deletePayment = async (id) => {
    await api.delete(`payments/${id}/`);
};
