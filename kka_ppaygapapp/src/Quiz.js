import React, { useState, useEffect } from 'react';
import './style.css';

const quizData = [
  {
    id: 1,
    question_type: "slider_year",
    data: {
      prompt: "In what year did the UK introduce the Equal Pay Act?",
      min: 1960,
      max: 1990,
      correct_answer: 1970
    }
  },
  {
    id: 2,
    question_type: "matching",
    data: {
      prompt: "Match these jobs to their average gender pay gap:",
      pairs: [
        { job: "Floorers & Wall Tilers", correct: "39%" },
        { job: "Train & Tram Drivers", correct: "-11%" },
        { job: "Exam Invigilators", correct: "0%" },
        { job: "Medical Practitioners", correct: "10%" }
      ],
      options: ["39%", "-11%", "0%", "10%"]
    }
  },
  {
    id: 3,
    question_type: "slider_pence",
    data: {
      prompt: "On average, how much does a woman earn for every £1 a man earns?",
      min: 70,
      max: 100,
      correct_answer: 93
    }
  },
  {
    id: 4,
    question_type: "ranking",
    data: {
      prompt: "Rank these from largest pay gap to smallest:",
      correct_order: ["England", "Wales", "Scotland", "Northern Ireland"]
    }
  },
  {
    id: 5,
    question_type: "slider_percent",
    data: {
      prompt: "What is the average percentage pay difference between mothers and fathers?",
      min: 0,
      max: 30,
      correct_answer: 24
    }
  }
];

function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);

  // This resets the Timer resets to 60 seconds for each question.
  const [timer, setTimer] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scored, setScored] = useState({});

  // Only shows the answer feedback when the user clicks "Show Answer".
  const [showAnswer, setShowAnswer] = useState(false);

  // Overall score.
  const [score, setScore] = useState(0);

  // Indicates if the current question was answered correctly.
  const [currentIsCorrect, setCurrentIsCorrect] = useState(null);


  const [rankingOrder, setRankingOrder] = useState([]);

  // When quiz is finished show the final score screen.
  const [showFinal, setShowFinal] = useState(false);
  const currentQ = quizData[currentQuestion];

  // When the quiz starts or the current question changes, reset the timer.
  useEffect(() => {
    if (!quizStarted) return;
    setTimer(60);
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          alert("Time is up!");
          handleShowAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
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

  // When "Show Answer" is pressed, evaluate the answer update the score, and display feedback.
  const handleShowAnswer = () => {
    let isCorrect = false;

    if (currentQ.question_type === "ranking") {
      // Use the current rankingOrder directly.
      const currentUserOrder = rankingOrder;
      const correctOrder = currentQ.data.correct_order;
      isCorrect = currentUserOrder.every((item, idx) => item === correctOrder[idx]);
      // Save the current rankingOrder as the user's answer.
      setAnswers(prev => ({ ...prev, [currentQ.id]: currentUserOrder }));
    } else {
      const userAnswer = answers[currentQ.id];
      if (
        currentQ.question_type === "slider_year" ||
        currentQ.question_type === "slider_pence" ||
        currentQ.question_type === "slider_percent"
      ) {
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
              onChange={(e) =>
                setAnswers({ ...answers, [question.id]: e.target.value })
              }
            />
            <span className="slider-value">
              {answers[question.id] || question.data.min}
            </span>
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
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [question.id]: {
                        ...answers[question.id],
                        [pair.job]: e.target.value,
                      },
                    })
                  }
                >
                  <option value="" disabled>
                    Select pay gap
                  </option>
                  {question.data.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
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
                  draggable
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

  // Render the answer feedback if the user has pressed "Show Answer".
  const renderAnswerFeedback = (question) => {
    let feedback = null;
    switch (question.question_type) {
      case "slider_year":
      case "slider_pence":
      case "slider_percent":
        feedback = (
          <div className="answer-feedback">
            <p>Your Answer: {answers[question.id]}</p>
            <p>Correct Answer: {question.data.correct_answer}</p>
            <p>
              {currentIsCorrect ? (
                <span className="correct-badge">Correct</span>
              ) : (
                <span className="incorrect-badge">Incorrect</span>
              )}
            </p>
          </div>
        );
        break;
      case "matching":
        feedback = (
          <div className="answer-feedback">
            <p>Correct Answers:</p>
            <ul>
              {question.data.pairs.map((pair, idx) => {
                const userOpt =
                  (answers[question.id] && answers[question.id][pair.job]) ||
                  "No answer";
                const isCorrect = userOpt === pair.correct;
                return (
                  <li key={idx}>
                    {pair.job}: Your Answer: {userOpt} | Correct: {pair.correct}{" "}
                    {isCorrect ? (
                      <span className="correct-badge">✓</span>
                    ) : (
                      <span className="incorrect-badge">✗</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
        break;
      case "ranking":
        feedback = (
          <div className="answer-feedback">
            <p>Your Order: {rankingOrder.join(" > ")}</p>
            <p>Correct Order: {question.data.correct_order.join(" > ")}</p>
            <p>
              {currentIsCorrect ? (
                <span className="correct-badge">Correct</span>
              ) : (
                <span className="incorrect-badge">Incorrect</span>
              )}
            </p>
          </div>
        );
        break;
      default:
        break;
    }
    return feedback;
  };

  
  if (showFinal) {
    return (
      <div>
        <div id="quiz-container" className="quiz-container">
          <h2>Your Final Score: {score} / {quizData.length}</h2>
          <button className="action-btn" onClick={handleReplay}>
            Replay Quiz
          </button>
        </div>
        <div className="articles">
          <h2>Articles</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
            ultricies sed, dolor.
          </p>
          <p>
            Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper
            congue, euismod non, mi.
          </p>
          <p>
            Proin porttitor, orci nec nonummy molestie, enim est eleifend mi,
            non fermentum diam nisl sit amet erat.
          </p>
          <p>
            Duis semper. Duis arcu massa, scelerisque vitae, consequat in,
            pretium a, enim.
          </p>
          <p>
            Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
            Cras vestibulum bibendum augue. Praesent egestas leo in pede.
          </p>
          <p>
            Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit
            sodales. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia Curae;
          </p>
        </div>
      </div>
    );
  }

  
  if (!quizStarted) {
    return (
      <div>
        <div id="quiz-container" className="quiz-container">
          <h1>Welcome to the Gender Pay Gap Quiz</h1>
          <button className="action-btn" onClick={handleStartQuiz}>
            Play Quiz
          </button>
        </div>
        <div className="articles">
          <h2>Articles</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
            ultricies sed, dolor.
          </p>
          <p>
            Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper
            congue, euismod non, mi.
          </p>
          <p>
            Proin porttitor, orci nec nonummy molestie, enim est eleifend mi,
            non fermentum diam nisl sit amet erat.
          </p>
          <p>
            Duis semper. Duis arcu massa, scelerisque vitae, consequat in,
            pretium a, enim.
          </p>
          <p>
            Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
            Cras vestibulum bibendum augue. Praesent egestas leo in pede.
          </p>
          <p>
            Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit
            sodales. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia Curae;
          </p>
        </div>
      </div>
    );
  }

  
  return (
    <div>
      <div id="quiz-container" className="quiz-container">
        <div id="timer">
          Time: <span id="timer-display">{timer}</span> s
        </div>
        <div className="quiz-step active">
          <h2>Question {currentQuestion + 1}</h2>
          <p className="question-prompt">{currentQ.data.prompt}</p>
          <div className="interaction-area">{renderInteraction(currentQ)}</div>
          {showAnswer && renderAnswerFeedback(currentQ)}
        </div>
        <div className="button-group">
          {!showAnswer ? (
            <button className="action-btn" onClick={handleShowAnswer}>
              Show Answer
            </button>
          ) : (
            <button className="action-btn" onClick={handleNext}>
              {currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          )}
        </div>
        <div className="score-display">Score: {score}</div>
      </div>
      <div className="articles">
        <h2>Articles</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor.
        </p>
        <p>
          Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper
          congue, euismod non, mi.
        </p>
        <p>
          Proin porttitor, orci nec nonummy molestie, enim est eleifend mi,
          non fermentum diam nisl sit amet erat.
        </p>
        <p>
          Duis semper. Duis arcu massa, scelerisque vitae, consequat in,
          pretium a, enim.
        </p>
        <p>
          Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
          Cras vestibulum bibendum augue. Praesent egestas leo in pede.
        </p>
        <p>
          Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit
          sodales. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia Curae;
        </p>
      </div>
    </div>
  );
}

export default Quiz;
