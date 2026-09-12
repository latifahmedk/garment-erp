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

export const getManufacturingMasters =
    async () => {

        const [
            products,
            employees,
        ] = await Promise.all([
            api.get("products/"),
            api.get("employees/"),
        ]);

        return {
            products:
                products.data.results,
            employees:
                employees.data.results,
        };

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