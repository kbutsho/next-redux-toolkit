"use client"

import Link from "next/link";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const count = useSelector((state) => state.counter.value)
    const cart = useSelector((state) => state.cart)
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container">
                    <span className="navbar-brand fw-bold">Navbar</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link" href="/">home</Link>
                            <Link className="nav-link" href="/product">product</Link>
                            <Link className="nav-link fw-bold text-danger" href="/counter">counter {count}</Link>
                            <Link className="nav-link fw-bold" href="/cart"><FaShoppingCart /> {cart.cartTotalQuantity}</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;