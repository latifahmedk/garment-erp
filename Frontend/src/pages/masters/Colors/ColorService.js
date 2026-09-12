// src/pages/masters/colors/ColorService.js

import api from "../../../api/axios";

export const getColors = async (page = 1, search = "") => {
    const response = await api.get("masters/colors/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const createColor = async (data) => {
    const response = await api.post("masters/colors/", data);

    return response.data;
};

export const updateColor = async (id, data) => {
    const response = await api.patch(`masters/colors/${id}/`, data);

    return response.data;
};

export const deleteColor = async (id) => {
    await api.delete(`masters/colors/${id}/`);
};