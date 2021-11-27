import React from 'react'
import { Link, useLocation, useNavigate} from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/home')
    }
    const location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/home' ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                        </li>
                        {localStorage.getItem('token') &&
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/notes' ? "active" : ""}`} aria-current="page" to="/notes">Notes</Link>
                        </li>}

                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>

                    {!localStorage.getItem('token') &&
                        <div className="d-flex">
                            <Link className={`btn btn-${location.pathname === '/login' ? "primary" : "light"} mx-1`} to="/login">Login</Link>
                            <Link className={`btn btn-${location.pathname === '/signup' ? "primary" : "light"} mx-1`} to="/signup">Signup</Link>
                        </div>}

                    {localStorage.getItem('token') &&
                        <div className="d-flex">
                            <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
                        </div>}

                </div>
            </div>
        </nav>
    )
}
