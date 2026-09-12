// src/pages/products/ProductService.js

import api from "../../api/axios";

export const getProducts = async (
    page = 1,
    search = ""
) => {
    const response = await api.get("products/", {
        params: {
            page,
            search,
        },
    });

    return response.data;
};

export const getMasters = async () => {
    const [
        categories,
        units,
        colors,
        fabrics,
        sizes,
    ] = await Promise.all([
        api.get("masters/categories/"),
        api.get("masters/units/"),
        api.get("masters/colors/"),
        api.get("masters/fabrics/"),
        api.get("masters/sizes/"),
    ]);

    return {
        categories: categories.data.results,
        units: units.data.results,
        colors: colors.data.results,
        fabrics: fabrics.data.results,
        sizes: sizes.data.results,
    };
};

export const createProduct = async (data) => {
    const response = await api.post(
        "products/",
        data
    );

    return response.data;
};

export const updateProduct = async (
    id,
    data
) => {
    const response = await api.put(
        `products/${id}/`,
        data
    );

    return response.data;
};

export const deleteProduct = async (id) => {
    await api.delete(`products/${id}/`);
};