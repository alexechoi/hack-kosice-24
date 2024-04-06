import React from 'react';
import './Tabbar.css';

export const Tabbar = () => {
    return (
        <div className="tabbar">
            <div className="tab">
                <span className="icon">🏠</span>
                <span className="label">Home</span>
            </div>
            <div className="tab">
                <span className="icon">🎮</span>
                <span className="label">Games</span>
            </div>
            <div className="tab">
                <span className="icon">💡</span>
                <span className="label">Advice</span>
            </div>
        </div>
    );
};
