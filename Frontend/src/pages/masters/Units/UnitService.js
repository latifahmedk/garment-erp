// src/pages/masters/units/UnitService.js

import api from "../../../api/axios";

export const getUnits = async (page = 1, search = "") => {
    const response = await api.get("masters/units/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const createUnit = async (data) => {
    const response = await api.post("masters/units/", data);

    return response.data;
};

export const updateUnit = async (id, data) => {
    const response = await api.put(`masters/units/${id}/`, data);

    return response.data;
};

export const deleteUnit = async (id) => {
    await api.delete(`masters/units/${id}/`);
};