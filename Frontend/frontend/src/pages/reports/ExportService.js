// src/pages/reports/ExportService.js

import api from "../../api/axios";

export const exportSalesPDF = async (
    params = {}
) => {

    const response = await api.get(
        "reports/sales/pdf/",
        {
            params,
            responseType: "blob",
        }
    );

    const url =
        window.URL.createObjectURL(
            new Blob([response.data])
        );

    const link =
        document.createElement("a");

    link.href = url;
    link.download = "sales-report.pdf";
    link.click();

};

export const exportPurchasePDF =
    async (params = {}) => {

        const response =
            await api.get(
                "reports/purchase/pdf/",
                {
                    params,
                    responseType:
                        "blob",
                }
            );

        const url =
            window.URL.createObjectURL(
                new Blob([
                    response.data,
                ])
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            "purchase-report.pdf";

        link.click();

    };

export const exportInventoryPDF =
    async () => {

        const response =
            await api.get(
                "reports/inventory/pdf/",
                {
                    responseType:
                        "blob",
                }
            );

        const url =
            window.URL.createObjectURL(
                new Blob([
                    response.data,
                ])
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            "inventory-report.pdf";

        link.click();

    };

export const exportSalesExcel =
    async (params = {}) => {

        const response =
            await api.get(
                "reports/sales/excel/",
                {
                    params,
                    responseType:
                        "blob",
                }
            );

        const url =
            window.URL.createObjectURL(
                new Blob([
                    response.data,
                ])
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            "sales-report.xlsx";

        link.click();

    };

export const exportPurchaseExcel =
    async (params = {}) => {

        const response =
            await api.get(
                "reports/purchase/excel/",
                {
                    params,
                    responseType:
                        "blob",
                }
            );

        const url =
            window.URL.createObjectURL(
                new Blob([
                    response.data,
                ])
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            "purchase-report.xlsx";

        link.click();

    };

export const exportInventoryExcel =
    async () => {

        const response =
            await api.get(
                "reports/inventory/excel/",
                {
                    responseType:
                        "blob",
                }
            );

        const url =
            window.URL.createObjectURL(
                new Blob([
                    response.data,
                ])
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            "inventory-report.xlsx";

        link.click();

    };