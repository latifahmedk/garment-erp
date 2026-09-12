import api from "../../../api/axios";

export const getCategories = async (page = 1, search = "") => {
    const response = await api.get("masters/categories/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const createCategory = async (data) => {
    const response = await api.post("masters/categories/", data);

    return response.data;
};

export const updateCategory = async (id, data) => {
    const response = await api.put(`masters/categories/${id}/`, data);

    return response.data;
};

export const deleteCategory = async (id) => {
    await api.delete(`masters/categories/${id}/`);
};