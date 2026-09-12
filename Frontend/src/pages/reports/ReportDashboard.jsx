// src/pages/reports/ReportDashboard.jsx

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import ReportActions from "../../components/ReportActions";

import {
  getDashboardReport,
  getChartData,
} from "./ReportService";

import SalesChart from "../../components/charts/SalesChart";
import PurchaseChart from "../../components/charts/PurchaseChart";
import ProfitChart from "../../components/charts/ProfitChart";
import InventoryChart from "../../components/charts/InventoryChart";

function ReportDashboard() {
  const [report, setReport] = useState(null);
  const [charts, setCharts] = useState(null);

  useEffect(() => {
    fetchDashboard();
    fetchCharts();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardReport();
      setReport(data);
    } catch {
      toast.error("Unable to load dashboard report.");
    }
  };

  const fetchCharts = async () => {
    try {
      const data = await getChartData();
      setCharts(data);
    } catch {
      toast.error("Unable to load chart data.");
    }
  };

  if (!report) {
    return (
      <DashboardLayout>
        <div className="text-center mt-5">
          <h5>Loading...</h5>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="mb-4">Business Analytics</h2>

      <ReportActions />

      {/* Statistics */}
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-3">
          <StatCard
            title="Sales"
            value={`$${report.total_sales}`}
            icon="bi-currency-dollar"
            color="#198754"
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <StatCard
            title="Purchases"
            value={`$${report.total_purchase}`}
            icon="bi-cart-check"
            color="#0d6efd"
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <StatCard
            title="Inventory Value"
            value={`$${report.inventory_value}`}
            icon="bi-box-seam"
            color="#fd7e14"
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <StatCard
            title="Profit"
            value={`$${report.profit}`}
            icon="bi-graph-up-arrow"
            color="#20c997"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="row mt-4">
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              Sales Summary
            </div>

            <div className="card-body">
              <table className="table table-bordered align-middle mb-0">
                <tbody>
                  <tr>
                    <td>Total Orders</td>
                    <td>{report.total_orders}</td>
                  </tr>

                  <tr>
                    <td>Customers</td>
                    <td>{report.customers}</td>
                  </tr>

                  <tr>
                    <td>Products</td>
                    <td>{report.products}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              Manufacturing
            </div>

            <div className="card-body">
              <table className="table table-bordered align-middle mb-0">
                <tbody>
                  <tr>
                    <td>Pending Orders</td>
                    <td>{report.pending_production}</td>
                  </tr>

                  <tr>
                    <td>Completed</td>
                    <td>{report.completed_production}</td>
                  </tr>

                  <tr>
                    <td>Low Stock</td>
                    <td>{report.low_stock}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      {charts && (
        <div className="row mt-4">
          <div className="col-lg-6 mb-4">
            <div className="card">
              <div className="card-header">
                Monthly Sales
              </div>

              <div className="card-body">
                <SalesChart
                  data={charts.sales}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card">
              <div className="card-header">
                Monthly Purchases
              </div>

              <div className="card-body">
                <PurchaseChart
                  data={charts.purchase}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card">
              <div className="card-header">
                Profit Trend
              </div>

              <div className="card-body">
                <ProfitChart
                  data={charts.profit}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="card">
              <div className="card-header">
                Inventory Distribution
              </div>

              <div className="card-body">
                <InventoryChart
                  data={charts.inventory}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ReportDashboard;