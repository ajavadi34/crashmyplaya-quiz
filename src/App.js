import './App.css';
import MultiChoiceQuestion from './shared/MultiChoiceQuestion';
import CmpLogo from './assets/cmp.png';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faXmark, faHandsClapping } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import questions from './utils/Questions';
import Modal from 'react-modal';

library.add(faCircleCheck, faCircleXmark, faXmark, faHandsClapping);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#282c34',
    minHeight: '30vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    color: 'white'
  },
};

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState();

  useEffect(() => {
    if (selectedAnswer) {
      setAnswers([...answers, selectedAnswer]);

      if (answers.length < questions.length - 1) {
        const nextQuestion = questions[answers.length + 1]
        setActiveQuestion(nextQuestion);
      }

      if (answers.length === questions.length - 1) {
        openModal();
      }
    }
  }, [selectedAnswer]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function hasIncorrectAnswer() {
    return answers.some((ans, i) => ans.id !== questions[i].correctChoice);
  }

  function resetQuiz() {
    setActiveQuestion(questions[0]);
    setAnswers([]);
    setSelectedAnswer(null);
    closeModal();
  }

  return (
    <div id='main' className="App">
      <header className="App-header">
        <div className='container'>
          <div className='row mt-4 justify-content-between'>
            <div className='col col-md-2'>
              <img className='App-logo' src={CmpLogo} alt='crashmyplaya' />
            </div>
            <div className='col col-md-2'>
              Question <br /> {answers.length + 1} of {questions.length}
            </div>
          </div>
        </div>
      </header>
      <section className="App-body">
        <MultiChoiceQuestion
          question={activeQuestion.question}
          answerId={activeQuestion.correctChoice}
          choices={activeQuestion.choices}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Results Modal"
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        {/* <div className='modal-close'>
          <FontAwesomeIcon icon="fa-solid fa-xmark" onClick={closeModal} />
        </div> */}
        <h2 className='mb-4'>Quiz Results</h2>
        {answers &&
          <div className='container'>
            <div className='row'>
              {answers.map((answer, i) =>
                <div className="col-12 text-center" key={i}>
                  {answer?.title || answer?.alt}
                  <span className="px-2">
                    {
                      (answer.id === questions[i].correctChoice) ?
                        <FontAwesomeIcon icon="fa-solid fa-circle-check" className="text-success" /> :
                        <FontAwesomeIcon icon="fa-solid fa-circle-xmark" className="text-danger" />
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        }

        <div className='mt-4'>
          {hasIncorrectAnswer() ?
            <button type='button' className='btn btn-primary' onClick={resetQuiz}>Try again</button> :
            <span>
              Congrats, you got them all right! <FontAwesomeIcon icon="fa-solid fa-hands-clapping" />
            </span>
          }
        </div>
      </Modal>
    </div >
  );
}

export default App;
