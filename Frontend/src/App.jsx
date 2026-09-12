// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";

import CategoryList from "./pages/masters/Categories/CategoryList";
import UnitList from "./pages/masters/Units/UnitList";
import ColorList from "./pages/masters/Colors/ColorList";
import FabricList from "./pages/masters/Fabrics/FabricList";
import SizeList from "./pages/masters/Sizes/SizeList";

import ProductList from "./pages/products/ProductList";
import CustomerList from "./pages/customers/CustomerList";
import SupplierList from "./pages/suppliers/SupplierList";

import PurchaseList from "./pages/purchases/PurchaseList";
import SalesList from "./pages/sales/SalesList";
import ManufacturingList from "./pages/manufacturing/ManufacturingList";
import InventoryList from "./pages/inventory/InventoryList";

import InvoiceList from "./pages/invoices/InvoiceList";
import PaymentList from "./pages/payments/PaymentList";

import ReportsDashboard from "./pages/reports/ReportDashboard";
import UserList from "./pages/users/UserList";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Masters */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/units"
          element={
            <ProtectedRoute>
              <UnitList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/colors"
          element={
            <ProtectedRoute>
              <ColorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fabrics"
          element={
            <ProtectedRoute>
              <FabricList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sizes"
          element={
            <ProtectedRoute>
              <SizeList />
            </ProtectedRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        {/* CRM */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomerList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <SupplierList />
            </ProtectedRoute>
          }
        />

        {/* Transactions */}
        <Route
          path="/purchases"
          element={
            <ProtectedRoute>
              <PurchaseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <SalesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manufacturing"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "PRODUCTION_MANAGER"]}>
                <ManufacturingList />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "PRODUCTION_MANAGER", "STORE"]}>
                <InventoryList />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Finance */}
        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "SALES_MANAGER"]}>
                <InvoiceList />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "SALES_MANAGER"]}>
                <PaymentList />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Analytics & Administration */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN", "SALES_MANAGER", "PRODUCTION_MANAGER"]}>
                <ReportsDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <RoleRoute roles={["ADMIN"]}>
                <UserList />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
