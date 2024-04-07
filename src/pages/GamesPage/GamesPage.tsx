import React from 'react';
import SnakeGameCanvas from './SnakeGameCanvas'; // Adjust the import path as necessary
import ScriptLoader from '../../components/ScriptLoader';
import './GamesPage.css';

function GamesPage(): JSX.Element {
  return (
    <div className="games-page">
      <SnakeGameCanvas />
    </div>
  );
}

export default GamesPage;
