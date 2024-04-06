import React from 'react';
import './TipsPage.css';

function TipsPage() {
  const tipsData = [
    {
      id: 1,
      text: 'Diversify your portfolio for better results',
    },
    {
      id: 2,
      text: 'Consider long-term investments for stability',
    },
  ];

  return (
    <div className="tips-container">
      <div className="tips-header">
        <h1 className="tips-title">AI Generated Tips</h1>
        <button className="tips-refresh-btn" onClick={() => window.location.reload()}>
          Refresh <span className="refresh-arrow">➡️</span>
        </button>
      </div>
      <ul className="tips-list">
        {tipsData.map((tip, index) => (
          <li key={tip.id} className="tip-item">
            <span className="tip-icon">💡</span>
            <p className="tip-text">{tip.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipsPage;
