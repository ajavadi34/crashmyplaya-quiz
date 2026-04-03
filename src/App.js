import './App.css';
import MultiChoiceQuestion from './shared/MultiChoiceQuestion';
import CmpLogo from './assets/cmp.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faHandsClapping } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import questions from './utils/Questions';

library.add(faCircleCheck, faCircleXmark, faHandsClapping);

function App() {
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null); // { choiceId, isCorrect }
  const [showResults, setShowResults] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);

  const feedbackTimer = useRef(null);

  useEffect(() => {
    return () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); };
  }, []);

  function handleAnswer(choice) {
    if (feedback) return; // block double-tap during flash

    const isCorrect = choice.id === activeQuestion.correctChoice;
    setFeedback({ choiceId: choice.id, isCorrect });

    feedbackTimer.current = setTimeout(() => {
      const newAnswers = [...answers, choice];
      setAnswers(newAnswers);
      setFeedback(null);

      if (newAnswers.length < questions.length) {
        setActiveQuestion(questions[newAnswers.length]);
        setQuestionKey(k => k + 1);
      } else {
        setShowResults(true);
      }
    }, 600);
  }

  function resetQuiz() {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setActiveQuestion(questions[0]);
    setAnswers([]);
    setFeedback(null);
    setShowResults(false);
    setQuestionKey(k => k + 1);
  }

  const progressPct = (answers.length / questions.length) * 100;

  const correctCount = answers.filter((ans, i) => ans.id === questions[i].correctChoice).length;

  return (
    <div id="main" className="App">
      {/* ── Header ── */}
      <header className="App-header">
        <div className="header-row">
          <img className="App-logo" src={CmpLogo} alt="crashmyplaya" />
          <span className="question-counter">
            Question {answers.length + 1} of {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-wrapper">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </header>

      {/* ── Question ── */}
      <section className="App-body">
        <MultiChoiceQuestion
          key={questionKey}
          question={activeQuestion.question}
          answerId={activeQuestion.correctChoice}
          choices={activeQuestion.choices}
          feedback={feedback}
          onAnswer={handleAnswer}
        />
      </section>

      {/* ── Results Overlay ── */}
      {showResults && (
        <div className="results-overlay">
          <div className="results-modal">
            <h2>Quiz Results 🎉</h2>

            <div className="score-display">
              <span className="score-num">{correctCount}</span>
              <span className="score-denom"> / {questions.length}</span>
            </div>

            <div className="results-list">
              {answers.map((answer, i) => {
                const isCorrect = answer.id === questions[i].correctChoice;
                return (
                  <div className="result-item" key={i}>
                    <span className="result-label">{answer.title || answer.alt}</span>
                    <span className={isCorrect ? 'result-correct' : 'result-wrong'}>
                      {isCorrect
                        ? <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                        : <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />}
                    </span>
                  </div>
                );
              })}
            </div>

            {correctCount === questions.length ? (
              <p className="congrats-msg">
                🙌 Perfect score! You know your stuff! <FontAwesomeIcon icon="fa-solid fa-hands-clapping" />
              </p>
            ) : (
              <p className="congrats-msg">
                You got {correctCount} out of {questions.length}. Give it another shot!
              </p>
            )}

            <button className="btn-action" onClick={resetQuiz}>
              {correctCount === questions.length ? 'Play Again' : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
