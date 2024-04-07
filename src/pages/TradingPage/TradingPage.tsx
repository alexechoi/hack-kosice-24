import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TradingPage.css';
import { doc, updateDoc, setDoc, getDoc, getDocs, query, where, collection, addDoc, increment } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function TradingPage() {
  const location = useLocation();
  const { companyName, symbol } = location.state || { companyName: 'Company XYZ', symbol: 'XYZ' };

  const [logoUrl, setLogoUrl] = useState('');
  // New state variables for price and change
  const [price, setPrice] = useState('');
  const [change, setChange] = useState('');
  const [direction, setDirection] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const userUid = '46oTvETaa5bgvK5ypnhflntegAi2';

  useEffect(() => {
    const constructedLogoUrl = `https://financialmodelingprep.com/image-stock/${symbol}.png`;
    setLogoUrl(constructedLogoUrl);
  
    // Fetching price and change
    fetch('https://price-retriever-s4ivkzg4ha-uc.a.run.app/get-price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbol: symbol }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data); // Log fetched data
      if (data.result) {
        const [fetchedPrice, fetchedDirection, fetchedChange] = data.result;
        console.log('Price:', fetchedPrice); // Log fetched price
        console.log('Direction:', fetchedDirection); // Log fetched direction
        console.log('Change:', fetchedChange); // Log fetched change
        setPrice(fetchedPrice);
        setDirection(fetchedDirection === 'up' ? '+' : '-');
        setChange(Math.abs(fetchedChange)); // Assuming you want the absolute value for display
      }
    })
    .catch(error => console.error('Error fetching stock data:', error));
  }, [symbol]);  

  const handleBuy = async () => {
    // Retrieve the user's portfolio document based on the uid
    const portfoliosRef = collection(db, 'portfolios');
    const portfolioQuery = query(portfoliosRef, where("uid", "==", userUid));
    const portfolioQuerySnapshot = await getDocs(portfolioQuery);
  
    let portfolioDocRef;
    if (!portfolioQuerySnapshot.empty) {
      portfolioDocRef = portfolioQuerySnapshot.docs[0].ref;
    } else {
      console.error('No portfolio found for the user');
      return;
    }
  
    // Work within the stocks sub-collection of the found portfolio
    const stocksRef = collection(portfolioDocRef, 'stocks');
    const stockQuery = query(stocksRef, where("ticker", "==", symbol));
    const stockQuerySnapshot = await getDocs(stockQuery);
  
    if (!stockQuerySnapshot.empty) {
      const stockDocRef = stockQuerySnapshot.docs[0].ref;
      await updateDoc(stockDocRef, {
        numberOfShares: stockQuerySnapshot.docs[0].data().numberOfShares + 1
      });
    } else {
      await addDoc(stocksRef, {
        companyName: companyName,
        existing: true,
        numberOfShares: 1,
        ticker: symbol
      });
    }
  
    // Update the user's balance
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, where("uid", "==", userUid));
    const userQuerySnapshot = await getDocs(userQuery);

    if (!userQuerySnapshot.empty) {
      const userDocRef = userQuerySnapshot.docs[0].ref;
      // Assuming `price` is a number. Ensure it's parsed as a number if it's a string.
      const stockPrice = parseFloat(price);
      await updateDoc(userDocRef, {
        balance: increment(-stockPrice) // Using increment directly here
      });
    } else {
      console.error('User document not found');
    }
  
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000); // Hide success message after 5 seconds
  };

  const handleSell = () => {
    console.log('Sell action');
  };

  return (
    <div className="trading-container">
      {showSuccessMessage && (
        <div className="success-banner">Stock Purchase Successful!</div>
      )}
      <div className="trading-card">
        <div className="trading-header">
          {logoUrl && <img src={logoUrl} alt="Company Logo" className="trading-icon" onError={(e) => e.target.style.display = 'none'} />}
          <div>
            <h2 className="trading-company-name">{companyName}</h2>
            <p className="trading-symbol">{symbol}</p>
          </div>
        </div>
        <div className="trading-price-info">
          <h3 className="trading-price-label">Price</h3>
          {/* Dynamically display the fetched price and change */}
          <p className="trading-price-value">${price}</p>
          <p className="trading-price-change">{direction}{change}%</p>
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
