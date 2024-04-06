import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TradingPage.css';

function TradingPage() {
  const location = useLocation();
  const { companyName, symbol } = location.state || { companyName: 'Company XYZ', symbol: 'XYZ' }; // Fallback values

  // State to hold the logo URL
  const [logoUrl, setLogoUrl] = useState('');

  // Fetch the logo URL using the symbol
  useEffect(() => {
    // Construct the logo URL from the symbol
    const constructedLogoUrl = `https://financialmodelingprep.com/image-stock/${symbol}.png`;
    setLogoUrl(constructedLogoUrl);
  }, [symbol]);

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
          {/* Display the logo if available */}
          {logoUrl && <img src={logoUrl} alt="Company Logo" className="trading-icon" onError={(e) => e.target.style.display = 'none'} />}
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
