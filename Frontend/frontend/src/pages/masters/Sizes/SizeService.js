// src/pages/masters/sizes/SizeService.js

import api from "../../../api/axios";

export const getSizes = async (page = 1, search = "") => {
    const response = await api.get("masters/sizes/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const createSize = async (data) => {
    const response = await api.post("masters/sizes/", data);

    return response.data;
};

export const updateSize = async (id, data) => {
    const response = await api.put(`masters/sizes/${id}/`, data);

    return response.data;
};

export const deleteSize = async (id) => {
    await api.delete(`masters/sizes/${id}/`);
};