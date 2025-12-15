import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart3 } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";

function Navbar() {
    return (
        <nav className="navbar text-bg-dark border-bottom " data-bs-theme="dark">
            <div className="container align-items-center">
                <Link className="navbar-brand" to="/">Catalog</Link>
                <div className='d-flex'>
                    <Link to={"/cart"} className='btn btn-outline-success me-3'>
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