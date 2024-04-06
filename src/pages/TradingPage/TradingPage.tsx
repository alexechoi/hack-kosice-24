import React from 'react';
import './TradingPage.css';

function TradingPage() {
  // Placeholder functions for the buttons
  const handleBuy = () => {
    console.log('Buy action');
  };

  const handleSell = () => {
    console.log('Sell action');
  };

  return (
    <div className="trading-container">
      <div className="trading-card">
        <div className="trading-header">
          <span className="trading-icon">⚪️</span>
          <div>
            <h2 className="trading-company-name">Company XYZ</h2>
            <p className="trading-symbol">XYZ</p>
          </div>
        </div>
        <div className="trading-price-info">
          <h3 className="trading-price-label">Price</h3>
          <p className="trading-price-value">$100</p>
          <p className="trading-price-change">+3.5%</p>
        </div>
        <div className="trading-actions">
          <button className="trading-sell-button" onClick={handleSell}>Sell</button>
          <button className="trading-buy-button" onClick={handleBuy}>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default TradingPage;
