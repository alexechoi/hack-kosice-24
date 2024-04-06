import React from 'react';
import './navbar.css';
import { Button } from '../Common/Button/Button';

export const Navbar = () => {
    const handleSearchClick = () => {
        // Placeholder function to simulate navigating to a search page
        console.log('Navigate to the search page.');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-title">Stocks App</h1>
                <div className="navbar-icons">
                    <Button className="icon-button" label="🔍" onClick={handleSearchClick} />
                    <span className="emoji">😊</span>
                </div>
            </div>
        </nav>
    );
};