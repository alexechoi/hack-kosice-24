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

          const stocksData = stocksSnapshot.docs.map(doc => {
            const data = doc.data();
            const logoUrl = `https://financialmodelingprep.com/image-stock/${data.ticker}.png`;
            return {
              id: doc.id,
              ...data,
              logoUrl,
            };
          });

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
    // You can define the logic for when the button is clicked
    console.log('Get your tips button clicked');
  };

  return (
    <div>
     <div className="hero-area">
        <div>
          <h1>Welcome, {userDetails.name}</h1>
          <p>Your balance: €{userDetails.balance}</p>
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
              </div>
              <div className="stock-price">{`$${stock.purchasePrice.toFixed(2)}`}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
