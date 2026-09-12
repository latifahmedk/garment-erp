import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles, roles }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const roleList = (allowedRoles || roles || []).map((r) => String(r).toUpperCase());

  if (roleList.length > 0) {
    const userRole = String(user.role || "").toUpperCase();
    if (!roleList.includes(userRole) && userRole !== "ADMIN") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}

export default RoleRoute;