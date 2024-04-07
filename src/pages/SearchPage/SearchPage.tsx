import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_KEY = "" // Insert API here

  const handleResultClick = (name, symbol) => {
    // Navigate to TradingPage with state from the search results
    navigate('/trading', { state: { companyName: name, symbol: symbol } });
  };

  const handleSearch = async () => {
    if (!searchTerm) return; // Prevent search with empty query

    setIsLoading(true);
    setError('');
    setSearchResults([]); // Reset previous results

    try {
      const response = await axios.get(`https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`);
      
      if (response.data && response.data.length > 0) {
        setSearchResults(response.data);
      } else {
        setError('No results found.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search Stocks</h1>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Enter stock symbol or company name" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p className="search-example">E.g., AAPL, GOOGL, Tesla</p>
      <button className="search-button" onClick={handleSearch}>Search</button>
      
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="search-results">
        {searchResults.map((result) => (
          <div key={result.symbol} className="search-result" onClick={() => handleResultClick(result.name, result.symbol)}>
            <span className="search-icon">💼</span>
            <div className="search-info">
              <h2 className="search-company-name">{result.name}</h2>
              <p className="search-stock-symbol">{result.symbol}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
