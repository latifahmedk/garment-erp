// src/pages/auth/AuthService.js

import api from "../../api/axios";

export const registerUser = async (data) => {
  const response = await api.post("accounts/register/", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("accounts/login/", data);
  return response.data;
};