import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    let navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-title">Stocks App</h1>
                <div className="navbar-icons">
                    <Link to="/search" className="icon-button">🔍</Link>
                </div>
            </div>
        </nav>
    );
};