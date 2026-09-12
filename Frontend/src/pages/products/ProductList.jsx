// src/pages/products/ProductList.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ProductModal from "./ProductModal";

import {
    getProducts,
    getMasters,
    createProduct,
    updateProduct,
    deleteProduct,
} from "./ProductService";

import { toast } from "react-toastify";

function ProductList() {

    const [products, setProducts] = useState([]);

    const [masters, setMasters] = useState({
        categories: [],
        units: [],
        colors: [],
        fabrics: [],
        sizes: [],
    });

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState(null);

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const data = await getProducts(
                page,
                search
            );

            setProducts(data.results);

            setCount(data.count);

        } catch {

            toast.error(
                "Unable to load products."
            );

        } finally {

            setLoading(false);

        }

    };

    const fetchMasters = async () => {

        try {

            const data = await getMasters();

            setMasters(data);

        } catch {

            toast.error(
                "Unable to load masters."
            );

        }

    };

    useEffect(() => {

        fetchProducts();

    }, [page, search]);

    useEffect(() => {

        fetchMasters();

    }, []);

    const handleSave = async (formData) => {

        try {

            setLoading(true);

            if (selectedProduct) {

                await updateProduct(
                    selectedProduct.id,
                    formData
                );

                toast.success(
                    "Product Updated Successfully"
                );

            } else {

                await createProduct(formData);

                toast.success(
                    "Product Created Successfully"
                );

            }

            setShowModal(false);

            setSelectedProduct(null);

            fetchProducts();

        } catch (error) {

            toast.error(
                error.response?.data?.detail ||
                    "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Delete this product?"
            )
        )
            return;

        try {

            await deleteProduct(id);

            toast.success(
                "Product Deleted Successfully"
            );

            fetchProducts();

        } catch {

            toast.error(
                "Unable to delete product."
            );

        }

    };

    const totalPages = Math.ceil(count / 10);

    return (

        <DashboardLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3>Products</h3>

                    <small>
                        Manage Products
                    </small>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedProduct(null);

                        setShowModal(true);

                    }}
                >
                    Add Product
                </button>

            </div>

            <input
                className="form-control mb-4"
                placeholder="Search Product..."
                value={search}
                onChange={(e) => {

                    setSearch(
                        e.target.value
                    );

                    setPage(1);

                }}
            />

            <table className="table table-dark table-hover align-middle">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>SKU</th>

                        <th>Category</th>

                        <th>Cost</th>

                        <th>Selling</th>

                        <th width="180">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {loading ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                Loading...
                            </td>

                        </tr>

                    ) : products.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Products Found
                            </td>

                        </tr>

                    ) : (

                        products.map(
                            (
                                product
                            ) => (

                                <tr
                                    key={
                                        product.id
                                    }
                                >

                                    <td>
                                        {
                                            product.name
                                        }
                                    </td>

                                    <td>
                                        {
                                            product.sku
                                        }
                                    </td>

                                    <td>
                                        {
                                            product.category_name
                                        }
                                    </td>

                                    <td>
                                        $
                                        {
                                            product.cost_price
                                        }
                                    </td>

                                    <td>
                                        $
                                        {
                                            product.selling_price
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {

                                                setSelectedProduct(
                                                    product
                                                );

                                                setShowModal(
                                                    true
                                                );

                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(
                                                    product.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )

                    )}

                </tbody>

            </table>

            <div className="d-flex justify-content-end gap-2">

                <button
                    className="btn btn-secondary"
                    disabled={page === 1}
                    onClick={() =>
                        setPage(page - 1)
                    }
                >
                    Previous
                </button>

                <button
                    className="btn btn-secondary"
                    disabled={
                        page >= totalPages
                    }
                    onClick={() =>
                        setPage(page + 1)
                    }
                >
                    Next
                </button>

            </div>

            <ProductModal
                show={showModal}
                onHide={() => {

                    setShowModal(false);

                    setSelectedProduct(null);

                }}
                onSubmit={handleSave}
                product={selectedProduct}
                masters={masters}
                loading={loading}
            />

        </DashboardLayout>

    );

}

export default ProductList;