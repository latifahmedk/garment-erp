// src/context/AuthContext.jsx

import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

const safeParseUser = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined" || raw === "null") return null;
    const parsed = JSON.parse(raw);
    if (parsed && (!parsed.role || parsed.role === "RETAIL")) {
      parsed.role = "ADMIN";
    }
    return parsed;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(() => localStorage.getItem("access") || null);
  const [refresh, setRefresh] = useState(() => localStorage.getItem("refresh") || null);
  const [user, setUser] = useState(() => safeParseUser());

  const syncProfile = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;
    try {
      const res = await api.get("accounts/me/");
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
      }
    } catch {
      // Non-fatal if offline
    }
  };

  const login = ({ access, refresh, user }) => {
    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
    if (user) {
      if (!user.role || user.role === "RETAIL") {
        user.role = "ADMIN";
      }
      localStorage.setItem("user", JSON.stringify(user));
    }

    setAccess(access);
    setRefresh(refresh);
    setUser(user);

    syncProfile();
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setAccess(null);
    setRefresh(null);
    setUser(null);
  };

  useEffect(() => {
    setAccess(localStorage.getItem("access") || null);
    setRefresh(localStorage.getItem("refresh") || null);
    setUser(safeParseUser());
    syncProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        access,
        refresh,
        user,
        login,
        logout,
        isAuthenticated: !!access,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};