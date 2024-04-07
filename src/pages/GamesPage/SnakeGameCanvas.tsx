import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const SnakeGameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameIntervalRef = useRef<number | null>(null);

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
            const tradingTip = response.data.choices[0]?.message?.content;
      
            if (tradingTip) {
              // Display the trading tip
              alert(`Trading Tip: ${tradingTip}`);
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
          food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box,
          };
          checkLevelUp();
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

  return <canvas ref={canvasRef} width="512" height="512" style={{ background: 'lightgrey' }}></canvas>;
};

export default SnakeGameCanvas;
