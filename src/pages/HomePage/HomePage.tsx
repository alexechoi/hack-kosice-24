import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import './HomePage.css';

function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: '', balance: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocksAndUserDetails = async () => {
      setIsLoading(true);
      if (currentUser) {
        console.log('Current user:', currentUser.uid);
  
        // Fetch user details
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("uid", "==", currentUser.uid));
        const userSnapshot = await getDocs(userQuery);
  
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUserDetails({
            name: `${userData.firstName} ${userData.lastName}`,
            balance: userData.balance
          });
        }
  
        // Fetch stocks
        const portfolioRef = collection(db, "portfolios");
        const portfolioQuery = query(portfolioRef, where("uid", "==", currentUser.uid));
        const portfolioSnapshot = await getDocs(portfolioQuery);
  
        if (!portfolioSnapshot.empty) {
          const stocksRef = collection(portfolioSnapshot.docs[0].ref, "stocks");
          const stocksSnapshot = await getDocs(stocksRef);
  
          let stocksData = stocksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            logoUrl: `https://financialmodelingprep.com/image-stock/${doc.data().ticker}.png`,
          }));
  
          stocksData = await Promise.all(stocksData.map(async (stock) => {
            try {
              const response = await fetch('https://price-retriever-s4ivkzg4ha-uc.a.run.app/get-price', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symbol: stock.ticker }),
              });
              const data = await response.json();
              if (data.result) {
                const [price, direction, change] = data.result;
                return {
                  ...stock,
                  currentPrice: price,
                  changePercentage: `${direction === 'up' ? '+' : '-'}${Math.abs(change * 100).toFixed(2)}%`,
                };
              } else {
                return stock; // In case there's no price data, return the original stock data
              }
            } catch (error) {
              console.error('Error fetching price data for', stock.ticker, error);
              return stock; // Return the original stock data in case of an error
            }
          }));
  
          setStocks(stocksData);
        }
        setIsLoading(false);
      } else {
        console.log('No current user.');
        setIsLoading(false);
      }
    };
  
    fetchStocksAndUserDetails();
  }, [currentUser]);  

  const handleStockClick = (companyName, symbol) => {
    navigate('/trading', { state: { companyName: companyName, symbol: symbol } });
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "";
    e.target.nextSibling.style.display = "inline";
  };

  const handleGetTips = () => {
    navigate('/tips');
  };

  return (
    <div>
      <div className="hero-area">
        <div>
          <h1>Welcome, {userDetails.name}</h1>
          <p>Your balance: ${userDetails.balance.toFixed(2)}</p>
        </div>
        <button className="tips-button" onClick={handleGetTips}>Get your tips</button>
      </div>
      <div className="stock-list">
        {isLoading ? (
          <div className="loader-container">
            <CircleLoader color="#00BFFF" size={150} />
          </div>
        ) : (
          stocks.map(stock => (
            <div key={stock.id} className="stock-item" onClick={() => handleStockClick(stock.companyName, stock.ticker)}>
              <img src={stock.logoUrl} alt={stock.companyName} className="stock-icon" onError={handleImageError} style={{display: stock.logoUrl ? 'inline' : 'none'}} />
              <span className="stock-emoji" style={{display: 'none'}}>💼</span>
              <div className="stock-info">
                <h2 className="stock-name">{stock.companyName}</h2>
                <p className="stock-symbol">{stock.ticker}</p>
                {/* Render current price and change percentage */}
                <p className="stock-price">Price: ${stock.currentPrice?.toFixed(2) || 'N/A'}</p>
                <p className="stock-change">Change: {stock.changePercentage || 'N/A'}</p>
              </div>
            </div>
          ))          
        )}
      </div>
    </div>
  );
}

export default HomePage;
