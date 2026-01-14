import React from 'react'
import { Link } from 'react-router-dom'
import { BsCart3 } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { BsBoxArrowRight } from "react-icons/bs";
import { logout } from '../redux/userReducer';

function Navbar() {
    const user = useSelector((store) => store.user.user);
    const totalProducts = useSelector((store) => store.cart.totalProducts);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <nav className="navbar text-bg-dark border-bottom " data-bs-theme="dark">
            <div className="container align-items-center">
                <Link className="navbar-brand" to="/">Catalog</Link>
                <div className='d-flex'>
                    <Link to={"/cart"} className='btn btn-outline-success position-relative'>
                        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{totalProducts}</span>
                        <BsCart3 />
                    </Link>
                    {
                        user ? <button
                            type='button'
                            className='btn btn-danger ms-3'
                            onClick={handleLogout}
                        >
                            <BsBoxArrowRight />
                        </button> :
                            <Link to={"/login"} className='btn btn-outline-primary ms-3'>
                                <BsPerson />
                            </Link>
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar