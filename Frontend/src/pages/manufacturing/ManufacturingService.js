// src/pages/manufacturing/ManufacturingService.js

import api from "../../api/axios";

export const getManufacturingOrders = async (
    page = 1,
    search = ""
) => {
    const response = await api.get(
        "manufacturing/",
        {
            params: {
                page,
                search,
            },
        }
    );

    return response.data;
};

export const getManufacturingMasters = async () => {
    try {
        const [productsRes, employeesRes] = await Promise.allSettled([
            api.get("products/"),
            api.get("employees/"),
        ]);

        const products = productsRes.status === "fulfilled"
            ? (productsRes.value.data?.results || productsRes.value.data || [])
            : [];

        const employees = employeesRes.status === "fulfilled"
            ? (employeesRes.value.data?.results || employeesRes.value.data || [])
            : [];

        return {
            products: Array.isArray(products) ? products : [],
            employees: Array.isArray(employees) ? employees : [],
        };
    } catch {
        return { products: [], employees: [] };
    }
};


export const createManufacturingOrder =
    async (data) => {

        const response =
            await api.post(
                "manufacturing/",
                data
            );

        return response.data;

    };

export const updateManufacturingOrder =
    async (
        id,
        data
    ) => {

        const response =
            await api.put(
                `manufacturing/${id}/`,
                data
            );

        return response.data;

    };

export const deleteManufacturingOrder =
    async (id) => {

        await api.delete(
            `manufacturing/${id}/`
        );

    };