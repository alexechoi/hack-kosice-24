import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { doc, updateDoc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const SnakeGameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameIntervalRef = useRef<number | null>(null);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [awardedStock, setAwardedStock] = useState('');
  const [showTipInterstitial, setShowTipInterstitial] = useState(false);
  const [tradingTip, setTradingTip] = useState('');
  const [padding, setPadding] = useState(0);

  const userUid = '46oTvETaa5bgvK5ypnhflntegAi2';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let gameSpeed = 400;
    let score = 0;
    let level = 1;
    let direction = "right";
    const levelThresholds = [1, 10, 20, 50, 100];
    const box = 32;
    let snake = [{ x: 8 * box, y: 8 * box }];

    let food = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box,
    };

    const createBG = () => {
      context.fillStyle = "lightgreen";
      context.fillRect(0, 0, 16 * box, 16 * box);
      context.strokeStyle = "red";
      context.strokeRect(0, 0, 16 * box, 16 * box);
    };

    const createSnake = () => {
      for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
      }
    };

    const drawFood = () => {
      context.fillStyle = "red";
      context.fillRect(food.x, food.y, box, box);
    };

    const drawScore = () => {
      context.fillStyle = "black";
      context.font = "20px Arial";
      context.fillText("Score: " + score, box, box);
    };

    const checkLevelUp = async () => {
      if (score >= levelThresholds[level - 1]) {
        clearInterval(gameIntervalRef.current);
    
        try {
          // Call the API to get a trading tip for beginners
          const response = await axios.post('https://tips-generator-s4ivkzg4ha-uc.a.run.app/get-tip/1', {
            message: 'Give me a trading tip.'
          });
    
          // Extract the trading tip from the response
          const tip = response.data.choices[0]?.message?.content;
    
          if (tip) {
            // Display the trading tip using the interstitial
            setTradingTip(tip);
            setShowTipInterstitial(true);
          } else {
            console.error('Trading tip not found in response:', response.data);
          }
        } catch (error) {
          console.error('Error fetching trading tip:', error);
        }
    
        // Continue the game without level up
        startGame();
      }
    };
    

      const checkFreeStocks = async () => {
        if (score >= 1) { // 4 is ONLY FOR DEMO
          const stocksAvailable = ["AAPL", "AMZN", "MSFT", "NVDA"];
          const randomIndex = Math.floor(Math.random() * stocksAvailable.length);
          const selectedStock = stocksAvailable[randomIndex];
      
          const stockRef = doc(db, `portfolio/${userUid}/stocks`, selectedStock);
      
          try {
            const docSnap = await getDoc(stockRef);
      
            if (docSnap.exists()) {
              await updateDoc(stockRef, {
                numberOfShares: docSnap.data().numberOfShares + 1
              });
            } else {
              await setDoc(stockRef, {
                companyName: selectedStock, // You might want to get the company name from an API or a predefined list
                existing: true,
                numberOfShares: 1,
                ticker: selectedStock
              });
            }
            // Show the interstitial modal with the stock information
            setShowInterstitial(true);
            setAwardedStock(selectedStock);
          } catch (error) {
            console.error('Error updating stock data:', error);
          }
        }
      };      

    const updateDirection = (event: MouseEvent) => {
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const dx = x - snake[0].x;
      const dy = y - snake[0].y;

      if (Math.abs(dx) > Math.abs(dy)) {
        // The click was further in the x direction
        if (dx > 0) direction = "right";
        else direction = "left";
      } else {
        // The click was further in the y direction
        if (dy > 0) direction = "down";
        else direction = "up";
      }
    };
    
    const updateScoreInDB = async () => {
      // TODO update score in db
    } 
    const startGame = () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);

      gameIntervalRef.current = window.setInterval(() => {
        if (snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
        if (snake[0].x < 0 && direction === "left") snake[0].x = 16 * box;
        if (snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
        if (snake[0].y < 0 && direction === "up") snake[0].y = 16 * box;

        for (let i = 1; i < snake.length; i++) {
          if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(gameIntervalRef.current);
            alert('Game Over :(');
          }
        }

        createBG();
        createSnake();
        drawFood();
        drawScore();

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "right") snakeX += box;
        if (direction === "left") snakeX -= box;
        if (direction === "up") snakeY -= box;
        if (direction === "down") snakeY += box;

        if (snakeX !== food.x || snakeY !== food.y) {
          snake.pop();
        } else {
          score++;
          updateScoreInDB();
          food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box,
          };
          checkLevelUp();
          checkFreeStocks();
        }

        const newHead = { x: snakeX, y: snakeY };
        snake.unshift(newHead);
      }, gameSpeed);
    };

    canvas.addEventListener('click', updateDirection);
    startGame();

    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      canvas.removeEventListener('click', updateDirection);
    };
  }, []);

  useEffect(() => {
    const calculatePadding = () => {
      const containerWidth = document.body.clientWidth; // Gets the width of the body, you might want to adjust this based on your actual container
      const canvasWidth = 512; // Fixed width of the canvas
      const newPadding = (containerWidth - canvasWidth) / 2;
      setPadding(newPadding > 0 ? newPadding : 0); // Update the padding state, ensure padding is not negative
    };

    // Calculate padding on mount and whenever the window is resized
    calculatePadding();
    window.addEventListener('resize', calculatePadding);

    return () => {
      window.removeEventListener('resize', calculatePadding); // Clean up listener
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width="512" height="512" style={{
        background: 'lightgrey',
        display: 'block',
        marginLeft: `${padding}px`,
        marginRight: `${padding}px`,
        marginTop: '20px'
      }}></canvas>
      {showInterstitial && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            padding: '20px',
            background: 'white',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'black',
          }}>
            <h2>Congratulations!</h2>
            <p>You've been awarded 1 share of {awardedStock}!</p>
            <button onClick={() => setShowInterstitial(false)}>Close</button>
          </div>
        </div>
      )}
      {showTipInterstitial && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1001, // Slightly higher to ensure it appears on top if both are triggered
        }}>
          <div style={{
            padding: '20px',
            background: 'white',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'black'
          }}>
            <h2>Trading Tip</h2>
            <p>{tradingTip}</p>
            <button onClick={() => setShowTipInterstitial(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );  
  
};

export default SnakeGameCanvas;
