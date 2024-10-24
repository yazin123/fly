// src/components/Quiz.js
'use client'
import React, { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

const questions = [
  { id: 1, question: "What is 12 + 8?", answer: "20" },
  { id: 2, question: "What is 15 × 4?", answer: "60" },
  { id: 3, question: "What is 100 ÷ 5?", answer: "20" },
  { id: 4, question: "What is 7 × 8?", answer: "56" },
  { id: 5, question: "What is 45 - 17?", answer: "28" },
  { id: 6, question: "What is 13 + 19?", answer: "32" },
  { id: 7, question: "What is 11 × 11?", answer: "121" },
  { id: 8, question: "What is 144 ÷ 12?", answer: "12" },
  { id: 9, question: "What is 50 + 75?", answer: "125" },
  { id: 10, question: "What is 9 × 9?", answer: "81" },
];

export default function QuizForm({ userData, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
    setAnswer('');
    setTimeLeft(30);
    setCurrentQuestion(prev => prev + 1);
  };

  const submitQuiz = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/registration', {
        method: 'POST',  // Add this line
        headers: {       // Add this line
          'Content-Type': 'application/json'  // Add this line
        },
        body: JSON.stringify({
          ...userData,
          answers
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      onComplete();
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      // Handle error appropriately
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4">Submitting your answers...</p>
        </div>
      </div>
    );
  }

  if (currentQuestion >= questions.length) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Question {currentQuestion + 1}/10</h2>
          <div className="flex items-center text-gray-300">
            <FaClock className="mr-2" />
            <span>{timeLeft}s</span>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-lg text-white">{questions[currentQuestion].question}</p>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            onClick={handleNextQuestion}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}