import React, { useState, useEffect } from 'react';
import './QuizPage.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  
    useEffect(() => {
      async function fetchQuestions() {
        const q = query(collection(db, "questions"), where("levelNumber", "==", 1));
        const querySnapshot = await getDocs(q);
        const fetchedQuestions = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const formattedQuestion = {
            questionText: data.questionText,
            answerOptions: data.options.map((option, index) => ({
              answerText: option,
              isCorrect: index === data.correctIndex,
            })),
          };
          fetchedQuestions.push(formattedQuestion);
        });
        // Shuffle and select 3 questions
        fetchedQuestions.sort(() => 0.5 - Math.random());
        setQuestions(fetchedQuestions.slice(0, 3));
      }
  
      fetchQuestions().catch(console.error);
    }, []);
  
    const handleAnswerButtonClick = (isCorrect, index) => {
        setSelectedAnswerIndex(index); // Set the selected index
    
        if (isCorrect) {
          setScore(score + 1);
        }
        // Wait for some time before moving to next question
        setTimeout(() => {
          const nextQuestion = currentQuestion + 1;
          if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswerIndex(-1); // Reset for next question
          } else {
            setShowScore(true);
          }
        }, 1000); // 1 second delay before next question
      };
    
      if (questions.length === 0) {
        return <div>Loading...</div>;
      }

    return (
        <div className='quiz-container'>
          {showScore ? (
            <div className='score-section'>
              You scored {score} out of {questions.length}
            </div>
          ) : (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{questions[currentQuestion].questionText}</div>
              </div>
              <div className='answer-section'>
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerButtonClick(answerOption.isCorrect, index)}
                    className={selectedAnswerIndex === index && answerOption.isCorrect ? 'answer-button correct' : 'answer-button'}
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }
    
    export default QuizPage;