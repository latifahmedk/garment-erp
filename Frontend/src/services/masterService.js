import api from "../api/axios";

export const getMasters = (endpoint, params = {}) =>
    api.get(endpoint, { params });

export const createMaster = (endpoint, data) =>
    api.post(endpoint, data);

export const updateMaster = (endpoint, id, data) =>
    api.put(`${endpoint}${id}/`, data);

export const deleteMaster = (endpoint, id) =>
    api.delete(`${endpoint}${id}/`);