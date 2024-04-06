import React from 'react';
import './HomePage.css';

function HomePage() {
  const stockData = [
    {
      id: 1,
      name: 'Apple Inc.',
      symbol: 'AAPL',
      price: '$150.25',
      emoji: '💼', // Using a briefcase emoji as a placeholder
    },
    {
      id: 2,
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      price: '$624.37',
      emoji: '🚗', // Using a car emoji as a placeholder
    },
  ];

  return (
    <div className="stock-list">
      {stockData.map(stock => (
        <div key={stock.id} className="stock-item">
          <span className="stock-icon">{stock.emoji}</span>
          <div className="stock-info">
            <h2 className="stock-name">{stock.name}</h2>
            <p className="stock-symbol">{stock.symbol}</p>
          </div>
          <div className="stock-price">{stock.price}</div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
