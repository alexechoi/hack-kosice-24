import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/tatra-dark-mini.png';

export const Navbar = () => {
    let navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-title">StockSnake</h1>
                <div className="tatra-dark-mini">
                    <img src={logo} alt="Tatra dark mini"/>
                </div>
                <div className="navbar-icons">
                    <Link to="/search" className="icon-button">🔍</Link>
                </div>
            </div>
        </nav>
    );
};