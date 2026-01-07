import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart3 } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { useSelector } from 'react-redux';

function Navbar() {
    const totalProducts = useSelector((store)=>store.cart.totalProducts);
    return (
        <nav className="navbar text-bg-dark border-bottom " data-bs-theme="dark">
            <div className="container align-items-center">
                <Link className="navbar-brand" to="/">Catalog</Link>
                <div className='d-flex'>
                    <Link to={"/cart"} className='btn btn-outline-success me-3 position-relative'>
                        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{totalProducts}</span>
                        <BsCart3 />
                    </Link>
                    <Link to={"/login"} className='btn btn-outline-primary'>
                        <BsPerson />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar