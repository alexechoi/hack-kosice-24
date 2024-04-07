import React from 'react';
import { To, useNavigate } from 'react-router-dom';
import './Tabbar.css';

export const Tabbar = () => {

    let navigate = useNavigate();

    const navigateTo = (path: To) => { // was without ': To'
        navigate(path);
    };

    return (
        <div className="tabbar">
            <div className="tab" onClick={() => navigateTo('/')}>
                <span className="icon">🏠</span>
                <span className="label">Home</span>
            </div>
            <div className="tab" onClick={() => navigateTo('/games')}>
                <span className="icon">🎮</span>
                <span className="label">Games</span>
            </div>
            <div className="tab" onClick={() => navigateTo('/quiz')}>
                <span className="icon">📖</span>
                <span className="label">Quiz</span>
            </div>
            <div className="tab" onClick={() => navigateTo('/tips')}>
                <span className="icon">💡</span>
                <span className="label">Advice</span>
            </div>
        </div>
    );
};
