import React, { useState, useEffect, useRef } from 'react';
import './style.css';

const quizData = [
  { id: 1, question_type: "slider_year", data: { prompt: "In what year did the UK introduce the Equal Pay Act?", min: 1960, max: 1990, correct_answer: 1970 } },
  { id: 2, question_type: "matching", data: { prompt: "Match these jobs to their average gender pay gap:", pairs: [ { job: "Floorers & Wall Tilers", correct: "39%" }, { job: "Train & Tram Drivers", correct: "-11%" }, { job: "Exam Invigilators", correct: "0%" }, { job: "Doctors", correct: "10%" } ], options: ["39%", "-11%", "0%", "10%"] } },
  { id: 3, question_type: "slider_pence", data: { prompt: "On average, how much does a woman earn for every £1 a man earns?", min: 70, max: 100, correct_answer: 93 } },
  { id: 4, question_type: "ranking", data: { prompt: "Rank these from largest pay gap to smallest:", correct_order: ["England", "Wales", "Scotland", "Northern Ireland"] } },
  { id: 5, question_type: "slider_percent", data: { prompt: "What is the average percentage pay difference between mothers and fathers?", min: 0, max: 30, correct_answer: 24 } }
];

function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const timerRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scored, setScored] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIsCorrect, setCurrentIsCorrect] = useState(null);
  const [rankingOrder, setRankingOrder] = useState([]);
  const [showFinal, setShowFinal] = useState(false);
  const currentQ = quizData[currentQuestion];

  useEffect(() => {
    if (!quizStarted) return;
    setTimer(60);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          alert("Time is up!");
          handleShowAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQuestion, quizStarted]);

  useEffect(() => {
    if (!quizStarted) return;
    setShowAnswer(false);
    setCurrentIsCorrect(null);
    if (currentQ.question_type === "ranking") {
      const shuffled = [...currentQ.data.correct_order].sort(() => Math.random() - 0.5);
      setRankingOrder(shuffled);
    }
  }, [currentQ, quizStarted]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleShowAnswer = () => {
    clearInterval(timerRef.current);
    let isCorrect = false;
    if (currentQ.question_type === "ranking") {
      const currentUserOrder = rankingOrder;
      const correctOrder = currentQ.data.correct_order;
      isCorrect = currentUserOrder.every((item, idx) => item === correctOrder[idx]);
      setAnswers(prev => ({ ...prev, [currentQ.id]: currentUserOrder }));
    } else {
      const userAnswer = answers[currentQ.id];
      if (currentQ.question_type === "slider_year" || currentQ.question_type === "slider_pence" || currentQ.question_type === "slider_percent") {
        isCorrect = Number(userAnswer) === currentQ.data.correct_answer;
      } else if (currentQ.question_type === "matching") {
        let allCorrect = true;
        currentQ.data.pairs.forEach(pair => {
          if (!userAnswer || userAnswer[pair.job] !== pair.correct) {
            allCorrect = false;
          }
        });
        isCorrect = allCorrect;
      }
    }
    if (!scored[currentQ.id]) {
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      setScored(prev => ({ ...prev, [currentQ.id]: true }));
    }
    setCurrentIsCorrect(isCorrect);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowFinal(true);
    }
  };

  const handleReplay = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setScored({});
    setShowAnswer(false);
    setScore(0);
    setRankingOrder([]);
    setCurrentIsCorrect(null);
    setShowFinal(false);
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData("dragIndex");
    if (dragIndex === "" || dragIndex === null) return;
    const newOrder = [...rankingOrder];
    const draggedItem = newOrder.splice(dragIndex, 1)[0];
    newOrder.splice(dropIndex, 0, draggedItem);
    setRankingOrder(newOrder);
  };

  const renderInteraction = (question) => {
    if (question.id === 1 && question.question_type === "slider_year") {
      return (
        <div className="slider-container">
          <input 
            type="range" 
            min={question.data.min} 
            max={question.data.max} 
            defaultValue={question.data.min} 
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })} 
            disabled={showAnswer} 
          />
          <span className="slider-value">{answers[question.id] || question.data.min}</span>
          <div className="slider-hint">
            <div className="key-item">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/500px-Flag_of_France.svg.png" alt="France Flag" className="flag-image" />
              <span>France introduced their equal pay act in 1972</span>
            </div>
            <div className="key-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/383px-Flag_of_the_United_States_%28Pantone%29.svg.png" alt="US Flag" className="flag-image" />
              <span>US introduced their equal pay act in 1963</span>
            </div>
          </div>
        </div>
      );
    }
    switch (question.question_type) {
      case "slider_year":
      case "slider_pence":
      case "slider_percent":
        return (
          <div className="slider-container">
            <input 
              type="range" 
              min={question.data.min} 
              max={question.data.max} 
              defaultValue={question.data.min} 
              onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })} 
              disabled={showAnswer} 
            />
            <span className="slider-value">{answers[question.id] || question.data.min}</span>
          </div>
        );
      case "matching":
        return (
          <div className="match-container">
            {question.data.pairs.map((pair, idx) => (
              <div key={idx} className="match-item">
                <span className="match-job">{pair.job}</span>
                <select 
                  defaultValue="" 
                  onChange={(e) => setAnswers({ ...answers, [question.id]: { ...answers[question.id], [pair.job]: e.target.value } })} 
                  disabled={showAnswer}
                >
                  <option value="" disabled>Select pay gap</option>
                  {question.data.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );
      case "ranking":
        return (
          <div className="ranking-container">
            <div className="ranking-label">Highest</div>
            <ul className="ranking-list">
              {rankingOrder.map((item, idx) => (
                <li 
                  key={idx} 
                  draggable={!showAnswer} 
                  onDragStart={(e) => onDragStart(e, idx)} 
                  onDragOver={onDragOver} 
                  onDrop={(e) => onDrop(e, idx)} 
                  className="ranking-item"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="ranking-label">Lowest</div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAnswerFeedback = (question) => {
    const feedbackClass = !currentIsCorrect ? "incorrect-feedback" : "";
    switch (question.question_type) {
      case "slider_year":
      case "slider_pence":
      case "slider_percent":
        return (
          <div className={`answer-feedback ${feedbackClass}`}>
            <p>Your Answer: {answers[question.id]}</p>
            <p>Correct Answer: {question.data.correct_answer}</p>
            <p>{currentIsCorrect ? <span className="correct-badge">Correct</span> : <span className="incorrect-badge">Incorrect</span>}</p>
          </div>
        );
      case "matching":
        return (
          <div className={`answer-feedback ${feedbackClass}`}>
            <p>Correct Answers:</p>
            <ul>
              {question.data.pairs.map((pair, idx) => {
                const userOpt = (answers[question.id] && answers[question.id][pair.job]) || "No answer";
                const isCorrect = userOpt === pair.correct;
                return (
                  <li key={idx}>
                    {pair.job}: Your Answer: {userOpt} | Correct: {pair.correct} {isCorrect ? <span className="correct-badge">✓</span> : <span className="incorrect-badge">✗</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      case "ranking":
        return (
          <div className={`answer-feedback ${feedbackClass}`}>
            <p>Your Order: {rankingOrder.join(" > ")}</p>
            <p>Correct Order: {question.data.correct_order.join(" > ")}</p>
            <p>{currentIsCorrect ? <span className="correct-badge">Correct</span> : <span className="incorrect-badge">Incorrect</span>}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="wrapper">
      {showFinal ? (
        <div id="quiz-container" className="quiz-container start-screen">
          <h2>Your Final Score: {score} / {quizData.length}</h2>
          <button className="action-btn" onClick={handleReplay}>Replay Quiz</button>
        </div>
      ) : !quizStarted ? (
        <div id="quiz-container" className="quiz-container start-screen">
          <h1>Welcome to the Gender Pay Gap Quiz</h1>
          <button className="action-btn" onClick={handleStartQuiz}>Play Quiz</button>
        </div>
      ) : (
        <div id="quiz-container" className="quiz-container">
          <div id="timer">Time: <span id="timer-display">{timer}</span> s</div>
          <div className="quiz-step active">
            <h2>Question {currentQuestion + 1}</h2>
            <p className="question-prompt">{currentQ.data.prompt}</p>
            <div className="interaction-area">{renderInteraction(currentQ)}</div>
            {showAnswer && renderAnswerFeedback(currentQ)}
          </div>
          <div className="button-group">
            {!showAnswer ? (
              <button className="action-btn" onClick={handleShowAnswer}>Show Answer</button>
            ) : (
              <button className="action-btn" onClick={handleNext}>{currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}</button>
            )}
          </div>
          <div className="score-display">Score: {score}</div>
        </div>
      )}
      <footer></footer>
    </div>
  );
}

export default Quiz;
