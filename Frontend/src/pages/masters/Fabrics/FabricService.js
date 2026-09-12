// src/pages/masters/fabrics/FabricService.js

import api from "../../../api/axios";

export const getFabrics = async (page = 1, search = "") => {
    const response = await api.get("masters/fabrics/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const createFabric = async (data) => {
    const response = await api.post("masters/fabrics/", data);

    return response.data;
};

export const updateFabric = async (id, data) => {
    const response = await api.put(`masters/fabrics/${id}/`, data);

    return response.data;
};

export const deleteFabric = async (id) => {
    await api.delete(`masters/fabrics/${id}/`);
};