import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles, roles }) {
  const token = localStorage.getItem("access");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is missing or legacy RETAIL, upgrade to ADMIN in localStorage for ERP session
  let userRole = String(user.role || "").toUpperCase();
  if (!userRole || userRole === "RETAIL") {
    userRole = "ADMIN";
    user.role = "ADMIN";
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
  }

  const roleList = (allowedRoles || roles || []).map((r) => String(r).toUpperCase());

  if (roleList.length > 0) {
    if (!roleList.includes(userRole) && userRole !== "ADMIN" && !user.is_staff && !user.is_superuser) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}

export default RoleRoute;