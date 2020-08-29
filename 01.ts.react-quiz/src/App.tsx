import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';

// Components
import QuestionCard from './components/QuestionCard';

// Types
import { Difficulty, QuestionState } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionIndex(0);

    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[questionIndex].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);

      // Save answer in the array for user answers
      const answerObject: AnswerObject = {
        answer,
        correct,
        correctAnswer: questions[questionIndex].correct_answer,
        question: questions[questionIndex].question,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion === TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setQuestionIndex(nextQuestion);
    }
  };

  return (
    <div className='app'>
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <button className='start' onClick={startQuiz}>
          Start
        </button>
      ) : null}
      {!gameOver && <p className='score'>Score: {score}</p>}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={questionIndex + 1}
          totalQuestion={TOTAL_QUESTION}
          question={questions[questionIndex].question}
          answers={questions[questionIndex].answers}
          userAnswer={userAnswers ? userAnswers[questionIndex] : undefined}
          callback={checkAnswer}
        />
      )}
      {!loading &&
        !gameOver &&
        userAnswers.length === questionIndex + 1 &&
        questionIndex < TOTAL_QUESTION - 1 && (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        )}
    </div>
  );
}

export default App;
