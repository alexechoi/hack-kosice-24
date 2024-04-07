import React, { useEffect, useState } from 'react';
import './TipsPage.css';
import axios from 'axios';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { CircleLoader } from 'react-spinners';

function TipsPage() {
  const [tipsData, setTipsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const db = getFirestore();

  useEffect(() => {
    const fetchUserDataAndTips = async () => {
      setIsLoading(true); // Start loading
      const uid = "46oTvETaa5bgvK5ypnhflntegAi2";

      const usersCollectionRef = collection(db, "users");
      const userQuery = query(usersCollectionRef, where("uid", "==", uid));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userProfile = userQuerySnapshot.docs[0].data();

        const interactionsDocRef = query(collection(db, "interactions"), where("uid", "==", uid));
        const interactionsSnapshot = await getDocs(interactionsDocRef);

        let history = [];
        if (!interactionsSnapshot.empty) {
          const interactionsDocId = interactionsSnapshot.docs[0].id;
          const userInteractionsRef = collection(db, "interactions", interactionsDocId, "user_interactions");
          const userInteractionsSnapshot = await getDocs(userInteractionsRef);

          history = userInteractionsSnapshot.docs.map(doc => ({
            price: doc.data().price,
            amountOfShares: doc.data().amountOfShares,
            buyAction: doc.data().buyAction,
            ticker: doc.data().ticker,
            timestamp: doc.data().timestamp ? doc.data().timestamp.toDate().toISOString() : null
          }));
        }

        const apiPayload = {
          userProfile: {
            ...userProfile,
            uid: uid
          },
          history: history
        };

        try {
          const response = await axios.post('https://personal-tips-s4ivkzg4ha-uc.a.run.app/get-personalised-tip', apiPayload);
          console.log('API Response:', response.data);

          // Check if response.data.choices exists and is an array
          if (response.data && Array.isArray(response.data.choices) && response.data.choices.length > 0) {
            // Handle the content based on its type
            const firstChoiceContent = response.data.choices[0].message.content;
            let tips;
            
            try {
              // Attempt to parse as JSON
              tips = JSON.parse(firstChoiceContent);
            } catch (parseError) {
              console.error('Error parsing JSON, treating as plain text:', parseError);
              // If parsing fails, treat the content as plain text
              // Split by new line or use the whole text as a single tip
              tips = firstChoiceContent.split('\n').map((text, index) => ({
                id: index,
                text: text.trim()
              })).filter(tip => tip.text.length > 0);

              // If splitting results in an empty array, use the whole text as one big tip
              if (tips.length === 0) {
                tips = [{ id: 0, text: firstChoiceContent }];
              }
            }
            
            setTipsData(tips.map((tip, index) => ({
              id: index,
              text: typeof tip.text === 'string' ? tip.text : 'Invalid tip format'
            })));
          } else {
            console.log('No tips in response:', response.data);
          }
        } catch (error) {
          console.error('Error calling the API:', error.response || error.message);
        }
      } else {
        console.log('User document does not exist');
      }
      setIsLoading(false); // End loading
    };

    fetchUserDataAndTips();
  }, []);

  return (
    <div className="tips-container">
      <div className="tips-header">
        <h1 className="tips-title">AI Generated Tips</h1>
        <button className="tips-refresh-btn" onClick={() => window.location.reload()}>
          Refresh <span className="refresh-arrow">➡️</span>
        </button>
      </div>
      {isLoading ? (
        <div className="loader-container">
          <CircleLoader color="#00BFFF" size={150} />
        </div>
      ) : (
        <ul className="tips-list">
          {tipsData.map((tip) => (
            <li key={tip.id} className="tip-item">
              <span className="tip-icon">💡</span>
              <p className="tip-text">{tip.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TipsPage;