import React, { useState } from 'react';
import './SearchPage.css';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Placeholder for search functionality
    console.log('Search for:', searchTerm);
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search Stocks</h1>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Enter stock symbol" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <p className="search-example">E.g., AAPL, GOOGL</p>
      <div className="search-result">
        <span className="search-icon">💼</span>
        <div className="search-info">
          <h2 className="search-company-name">Company Name</h2>
          <p className="search-stock-symbol">Stock Symbol</p>
        </div>
      </div>
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchPage;