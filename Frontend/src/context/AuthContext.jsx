// src/context/AuthContext.jsx

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const safeParseUser = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined" || raw === "null") return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(() => localStorage.getItem("access") || null);
  const [refresh, setRefresh] = useState(() => localStorage.getItem("refresh") || null);
  const [user, setUser] = useState(() => safeParseUser());

  const login = ({ access, refresh, user }) => {
    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    setAccess(access);
    setRefresh(refresh);
    setUser(user);
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