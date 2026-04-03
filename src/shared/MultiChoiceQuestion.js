import React from 'react';
import Choice from './Choice';

export default function MultiChoiceQuestion({ question, choices, feedback, onAnswer }) {
  return (
    <div className="question-enter">
      <h1 className="question-title">{question}</h1>
      <div className="choices-grid">
        {choices.map(choice => (
          <Choice
            key={choice.id}
            choice={choice}
            feedback={feedback}
            onAnswer={onAnswer}
          />
        ))}
      </div>
    </div>
  );
}
