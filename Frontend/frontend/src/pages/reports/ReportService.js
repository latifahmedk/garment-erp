// src/pages/reports/ReportService.js

import api from "../../api/axios";


export const getChartData =
    async () => {

        const response =
            await api.get(
                "reports/charts/"
            );

        return response.data;

    };

export const getDashboardReport = async () => {
    const response = await api.get(
        "reports/dashboard/"
    );

    return response.data;
};

export const getSalesReport = async (
    params
) => {
    const response = await api.get(
        "reports/sales/",
        {
            params,
        }
    );

    return response.data;
};

export const getPurchaseReport = async (
    params
) => {
    const response = await api.get(
        "reports/purchases/",
        {
            params,
        }
    );

    return response.data;
};

export const getInventoryReport =
    async () => {
        const response =
            await api.get(
                "reports/inventory/"
            );

        return response.data;
    };

export const getManufacturingReport =
    async (params) => {
        const response =
            await api.get(
                "reports/manufacturing/",
                {
                    params,
                }
            );

        return response.data;
    };

export const getProfitLossReport =
    async (params) => {
        const response =
            await api.get(
                "reports/profit-loss/",
                {
                    params,
                }
            );

        return response.data;
    };