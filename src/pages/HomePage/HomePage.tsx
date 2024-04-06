import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [stocks, setStocks] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      if (currentUser) {
        console.log('Current user:', currentUser.uid); // Log the UID of the current user
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
            return {
              id: doc.id,
              ...data,
              emoji: '💼',
            };
          });

          setStocks(stocksData);
        } else {
          console.log('No portfolio document found for the current user.');
        }
      } else {
        console.log('No current user.');
      }
    };

    fetchStocks();
  }, [currentUser]);

  if (stocks.length === 0) {
    return <div>Loading stocks...</div>; // Provide a loading state or message
  }

  const handleStockClick = (companyName, symbol) => {
    navigate('/trading', { state: { companyName: companyName, symbol: symbol } });
  };  

  return (
    <div className="stock-list">
      {stocks.map(stock => (
        <div key={stock.id} className="stock-item" onClick={() => handleStockClick(stock.companyName, stock.ticker)}>
          <span className="stock-icon">{stock.emoji}</span>
          <div className="stock-info">
            <h2 className="stock-name">{stock.companyName}</h2>
            <p className="stock-symbol">{stock.ticker}</p>
          </div>
          <div className="stock-price">{`$${stock.purchasePrice.toFixed(2)}`}</div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
