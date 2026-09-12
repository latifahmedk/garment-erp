// src/components/ReportActions.jsx

import {
    exportSalesPDF,
    exportPurchasePDF,
    exportInventoryPDF,
    exportSalesExcel,
    exportPurchaseExcel,
    exportInventoryExcel,
} from "../pages/reports/ExportService";

function ReportActions() {

    return (

        <div className="d-flex flex-wrap gap-3 mb-4">

            <button
                className="btn btn-danger"
                onClick={exportSalesPDF}
            >
                Sales PDF
            </button>

            <button
                className="btn btn-success"
                onClick={exportSalesExcel}
            >
                Sales Excel
            </button>

            <button
                className="btn btn-danger"
                onClick={
                    exportPurchasePDF
                }
            >
                Purchase PDF
            </button>

            <button
                className="btn btn-success"
                onClick={
                    exportPurchaseExcel
                }
            >
                Purchase Excel
            </button>

            <button
                className="btn btn-danger"
                onClick={
                    exportInventoryPDF
                }
            >
                Inventory PDF
            </button>

            <button
                className="btn btn-success"
                onClick={
                    exportInventoryExcel
                }
            >
                Inventory Excel
            </button>

        </div>

    );

}

export default ReportActions;