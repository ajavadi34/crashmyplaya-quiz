import React from 'react';

export default function Choice({ choice, feedback, onAnswer }) {
  // Determine feedback class for this specific card
  let feedbackClass = '';
  if (feedback && feedback.choiceId === choice.id) {
    feedbackClass = feedback.isCorrect ? 'correct' : 'wrong';
  }

  if (choice.imgUrl) {
    // ── Image Card ──────────────────────────────────────
    return (
      <div
        className={`choice-card ${feedbackClass}`}
        role="button"
        tabIndex={0}
        onClick={() => onAnswer(choice)}
        onKeyDown={e => e.key === 'Enter' && onAnswer(choice)}
      >
        <img src={choice.imgUrl} alt={choice.alt} />
        <div className="choice-overlay">
          <span>{choice.alt}</span>
        </div>
      </div>
    );
  }

  // ── Text Pill Button ───────────────────────────────────
  return (
    <button
      className={`choice-pill ${feedbackClass}`}
      onClick={() => onAnswer(choice)}
    >
      {choice.title}
    </button>
  );
}
