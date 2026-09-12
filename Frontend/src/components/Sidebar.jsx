// src/components/Sidebar.jsx

import { NavLink } from "react-router-dom";
import { COLORS } from "../utils/colors";

const menuGroups = [
  {
    title: "MAIN",
    items: [
      { name: "Dashboard", icon: "bi-speedometer2", path: "/dashboard" },
    ],
  },
  {
    title: "MASTERS",
    items: [
      { name: "Categories", icon: "bi-grid", path: "/categories" },
      { name: "Units", icon: "bi-rulers", path: "/units" },
      { name: "Colors", icon: "bi-palette", path: "/colors" },
      { name: "Fabrics", icon: "bi-layers", path: "/fabrics" },
      { name: "Sizes", icon: "bi-aspect-ratio", path: "/sizes" },
    ],
  },
  {
    title: "PRODUCTS",
    items: [
      { name: "Products", icon: "bi-box-seam", path: "/products" },
    ],
  },
  {
    title: "CRM",
    items: [
      { name: "Customers", icon: "bi-people", path: "/customers" },
      { name: "Suppliers", icon: "bi-truck", path: "/suppliers" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { name: "Purchases", icon: "bi-cart-plus", path: "/purchases" },
      { name: "Sales", icon: "bi-bag-check", path: "/sales" },
      { name: "Manufacturing", icon: "bi-gear-wide-connected", path: "/manufacturing" },
      { name: "Inventory", icon: "bi-boxes", path: "/inventory" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { name: "Invoices", icon: "bi-receipt", path: "/invoices" },
      { name: "Payments", icon: "bi-credit-card", path: "/payments" },
    ],
  },
  {
    title: "ANALYTICS & ACCESS",
    items: [
      { name: "Reports", icon: "bi-bar-chart-line", path: "/reports" },
      { name: "Users", icon: "bi-shield-lock", path: "/users" },
    ],
  },
];

function Sidebar() {
  return (
    <aside
      style={{
        width: 270,
        height: "100vh",
        background: COLORS.sidebar,
        borderRight: `1px solid ${COLORS.border}`,
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: "22px 24px",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: COLORS.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "1.2rem",
          }}
        >
          <i className="bi bi-scissors" />
        </div>
        <div>
          <h6
            style={{
              margin: 0,
              color: COLORS.text,
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "0.5px",
            }}
          >
            GARMENTS ERP
          </h6>
          <small
            style={{
              color: COLORS.textSecondary,
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Apparel Suite
          </small>
        </div>
      </div>

      {/* Nav List */}
      <div style={{ padding: "16px 14px", flex: 1 }}>
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} style={{ marginBottom: 20 }}>
            <div
              style={{
                color: COLORS.textSecondary,
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                padding: "4px 12px 8px 12px",
              }}
            >
              {group.title}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {group.items.map((item, itemIdx) => (
                <NavLink
                  key={itemIdx}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 14px",
                    borderRadius: 10,
                    textDecoration: "none",
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#ffffff" : COLORS.textSecondary,
                    background: isActive ? COLORS.primary : "transparent",
                    transition: "all 0.18s ease",
                  })}
                >
                  <i
                    className={`bi ${item.icon}`}
                    style={{
                      fontSize: "1.05rem",
                    }}
                  />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div
        style={{
          padding: "14px 20px",
          borderTop: `1px solid ${COLORS.border}`,
          fontSize: "0.75rem",
          color: COLORS.textSecondary,
        }}
      >
        <span>v1.0.0 · Production Ready</span>
      </div>
    </aside>
  );
}

export default Sidebar;
