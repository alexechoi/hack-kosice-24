import React from 'react';
import SnakeGameCanvas from './SnakeGameCanvas'; // Adjust the import path as necessary

function GamesPage(): JSX.Element {
  return (
    <div className="games-page">
      <SnakeGameCanvas />
    </div>
  );
}

export default GamesPage;
