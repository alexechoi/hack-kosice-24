import React from 'react';
import { useLocation } from 'react-router-dom';
import './TradingPage.css';

function TradingPage() {

  const location = useLocation();
  const { companyName, symbol } = location.state || { companyName: 'Company XYZ', symbol: 'XYZ' }; // Fallback values

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
          {/* Updated to use passed state */}
          <span className="trading-icon">⚪️</span>
          <div>
            <h2 className="trading-company-name">{companyName}</h2>
            <p className="trading-symbol">{symbol}</p>
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
