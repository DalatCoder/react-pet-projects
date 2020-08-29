import React from 'react';

// Types
import { AnswerObject } from '../App';

type Props = {
  question: string;
  answers: string[];
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestion: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestion,
}) => (
  <div>
    <p className='number'>
      Question: {questionNumber} / {totalQuestion}
    </p>
    <p className='question' dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map((answer) => (
        <div key={answer}>
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span>{answer}</span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
