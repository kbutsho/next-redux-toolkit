"use client";

import { addToCart } from "@/redux/features/cartSlice";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("https://dummyjson.com/products");
            setProducts(response.data.products);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const dispatch = useDispatch()
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Product List</h2>

            {loading && <div className="alert alert-info">Loading products...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div style={{ position: "relative", height: "250px", width: "100%" }}>
                                    <Image
                                        priority
                                        src={product.thumbnail}
                                        alt={product.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        style={{ objectFit: "cover", borderTopLeftRadius: "0.25rem", borderTopRightRadius: "0.25rem" }}
                                    />
                                </div>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text text-muted">{product.description.slice(0, 200)}...</p>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <strong>${product.price}</strong>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleAddToCart(product)}
                                            style={{ minWidth: "110px" }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductPage;
