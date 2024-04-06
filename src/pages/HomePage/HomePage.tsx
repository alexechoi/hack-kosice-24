import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import './HomePage.css';

function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      if (currentUser) {
        console.log('Current user:', currentUser.uid);
        const portfolioRef = collection(db, "portfolios");
        const q = query(portfolioRef, where("uid", "==", currentUser.uid));
        const portfolioSnapshot = await getDocs(q);

        console.log('Portfolio snapshot empty:', portfolioSnapshot.empty);
        if (!portfolioSnapshot.empty) {
          const userPortfolioDoc = portfolioSnapshot.docs[0];
          console.log('User portfolio doc:', userPortfolioDoc.data());
          const stocksRef = collection(userPortfolioDoc.ref, "stocks");
          const stocksSnapshot = await getDocs(stocksRef);

          console.log('Number of stocks fetched:', stocksSnapshot.docs.length);
          const stocksData = stocksSnapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Stock data:', data);
            const logoUrl = `https://financialmodelingprep.com/image-stock/${data.ticker}.png`;
            return {
              id: doc.id,
              ...data,
              logoUrl, // Include logo URL instead of emoji
            };
          });

          setStocks(stocksData);
          setIsLoading(false);
        } else {
          console.log('No portfolio document found for the current user.');
        }
      } else {
        console.log('No current user.');
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, [currentUser]);

  const handleStockClick = (companyName, symbol) => {
    navigate('/trading', { state: { companyName: companyName, symbol: symbol } });
  };  

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent endless loop
    e.target.src = ""; // Hide broken image icon
    e.target.nextSibling.style.display = "inline"; // Show fallback emoji
  };

  return (
    <div className="stock-list">
      {isLoading ? (
        <div className="loader-container">
          <CircleLoader color="#00BFFF" size={150} />
        </div>
      ) : (
        stocks.map(stock => (
          <div key={stock.id} className="stock-item" onClick={() => handleStockClick(stock.companyName, stock.ticker)}>
            <img src={stock.logoUrl} alt={stock.companyName} className="stock-icon" onError={handleImageError} style={{display: stock.logoUrl ? 'inline' : 'none'}} />
            <span className="stock-emoji" style={{display: 'none'}}>💼</span> {/* This will be shown if img fails to load */}
            <div className="stock-info">
              <h2 className="stock-name">{stock.companyName}</h2>
              <p className="stock-symbol">{stock.ticker}</p>
            </div>
            <div className="stock-price">{`$${stock.purchasePrice.toFixed(2)}`}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default HomePage;
