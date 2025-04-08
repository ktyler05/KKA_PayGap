import React, { useState, useEffect } from "react";
import "./style.css";

const quizData = [
  {
    id: 1,
    question_type: "slider_pence",
    data: {
      prompt:
        "On average, how much does a woman earn for every £1 a man earns?",
      min: 70,
      max: 100,
      correct_answer: 93,
    },
  },
  {
    id: 2,
    question_type: "slider_year",
    data: {
      prompt: "In what year did the UK introduce the Equal Pay Act?",
      min: 1960,
      max: 1990,
      correct_answer: 1970,
    },
  },
  {
    id: 3,
    question_type: "ranking",
    data: {
      prompt: "Rank these from smallest pay gap to largest:",
      correct_order: ["Scotland", "Wales", "England"],
    },
  },
  {
    id: 4,
    question_type: "matching",
    data: {
      prompt: "Match these companies to their median gender pay gap:",
      pairs: [
        { job: "Lidl", correct: "0%" },
        { job: "NHS", correct: "-13%" },
        { job: "Next", correct: "17.3%" },
        { job: "HSBC", correct: "48.3" },
      ],
      options: ["48.3", "0%", "-13%", "17.3%"],
    },
  },
  {
    id: 5,
    question_type: "slider_percent",
    data: {
      prompt:
        "What is the average percentage pay difference between mothers and fathers?",
      min: 0,
      max: 30,
      correct_answer: 24,
    },
  },
];

const references = {
  4: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024",
  1: "https://www.ciphr.com/infographics/gender-pay-gap-statistics-2024",
  3: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024",
  5: "https://www.theguardian.com/world/2024/mar/08/uk-mothers-earned-444-less-an-hour-than-fathers-in-2023-finds-analysis",
};

// Optional: If you want different lorem for each question, put them in an array:
const questionLorems = [
  "Lorem #1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem #2: Nullam ac neque at elit condimentum fermentum in ut eros.",
  "Lorem #3: Maecenas dignissim, nulla id volutpat laoreet, nibh tellus.",
  "Lorem #4: Cras convallis lacus nec diam fermentum, nec molestie nisl.",
  "Lorem #5: Aliquam suscipit mauris libero, sed hendrerit ipsum auctor.",
];

function Quiz() {
  // Tracks user input for sliders / matching / etc.
  const [answers, setAnswers] = useState({});

  // Keep track if a question has been “scored” to avoid re-scoring
  const [scored, setScored] = useState({});

  // When the user hits “Show Answer” for a question, we store that in showAnswer
  const [showAnswer, setShowAnswer] = useState({});

  // Overall quiz score
  const [score, setScore] = useState(0);

  // For the ranking question
  const [rankingOrder, setRankingOrder] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  // Indicate correctness of the most recently scored question
  const [currentIsCorrect, setCurrentIsCorrect] = useState(null);

  // “visibleUpTo” controls which question we’re up to:
  // e.g. if visibleUpTo=1, we only show question 0 (+ its lorem).
  // Once user “Show Answer” for question i, we set visibleUpTo = i+2 => next question appears.
  const [visibleUpTo, setVisibleUpTo] = useState(1);

  // ----------------------------------------------------------------
  // ------------------ MATCHING QUESTION HOOKS ----------------------
  // ----------------------------------------------------------------
  const [selectedJob, setSelectedJob] = useState(null);
  const [matchedJobs, setMatchedJobs] = useState({});
  const [jobColors, setJobColors] = useState({});
  const [gapColors, setGapColors] = useState({});
  const [flashRed, setFlashRed] = useState({});

  const colorMap = {
    Next: "#FFC1CC",
    HSBC: "#C2E7FF",
    NHS: "#FFF9C4",
    Lidl: "#D7BCE8",
  };

  // Shuffle the ranking question’s items once on mount
  useEffect(() => {
    const rankingQ = quizData.find((q) => q.question_type === "ranking");
    if (rankingQ) {
      const shuffled = [...rankingQ.data.correct_order].sort(
        () => Math.random() - 0.5
      );
      setRankingOrder(shuffled);
    }
  }, []);

  // ----------------------------------------------------------------
  // ------------------- “SHOW ANSWER” BUTTON ------------------------
  // ----------------------------------------------------------------
  const handleShowAnswer = (questionId, questionIndex) => {
    // Reveal the answer for this question
    setShowAnswer((prev) => ({ ...prev, [questionId]: true }));

    // Score it if not already done
    if (!scored[questionId]) {
      const question = quizData[questionIndex];
      let isCorrect = false;

      if (question.question_type === "ranking") {
        const correctOrder = question.data.correct_order;
        isCorrect = rankingOrder.every(
          (item, idx) => item === correctOrder[idx]
        );
        // Store user’s final ranking in answers
        setAnswers((prev) => ({ ...prev, [questionId]: rankingOrder }));
      } else if (
        question.question_type === "slider_year" ||
        question.question_type === "slider_pence" ||
        question.question_type === "slider_percent"
      ) {
        const userAnswer = answers[questionId];
        isCorrect = Number(userAnswer) === question.data.correct_answer;
      } else if (question.question_type === "matching") {
        // Check each correct pairing
        let allCorrect = true;
        for (let { job, correct } of question.data.pairs) {
          if (!matchedJobs[job] || matchedJobs[job] !== correct) {
            allCorrect = false;
            break;
          }
        }
        isCorrect = allCorrect;
      }

      // Update overall score if correct
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setScored((prev) => ({ ...prev, [questionId]: true }));
      setCurrentIsCorrect(isCorrect);
    }

    // After revealing answer for question i, show the next question i+1:
    // i.e. visibleUpTo = i+2
    setVisibleUpTo(questionIndex + 2);
  };

  // ----------------------------------------------------------------
  // --------------------- RANKING DRAG LOGIC ------------------------
  // ----------------------------------------------------------------
  const handlePointerDown = (e, index) => {
    setDraggingIndex(index);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (draggingIndex == null) return;
    const boundingRect = e.currentTarget.getBoundingClientRect();
    const pointerY = e.clientY || (e.touches && e.touches[0].clientY);
    const itemHeight = boundingRect.height / rankingOrder.length;
    let newIndex = Math.floor((pointerY - boundingRect.top) / itemHeight);
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= rankingOrder.length) newIndex = rankingOrder.length - 1;

    if (newIndex !== draggingIndex) {
      const newOrder = [...rankingOrder];
      const draggedItem = newOrder.splice(draggingIndex, 1)[0];
      newOrder.splice(newIndex, 0, draggedItem);
      setRankingOrder(newOrder);
      setDraggingIndex(newIndex);
    }
  };

  const handlePointerUp = (e) => {
    setDraggingIndex(null);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // ----------------------------------------------------------------
  // --------------------- MATCHING LOGIC ----------------------------
  // ----------------------------------------------------------------
  const handleJobClick = (job) => {
    if (matchedJobs[job]) return; // already matched
    setSelectedJob(job);
  };

  const handleGapClick = (gap) => {
    if (Object.values(matchedJobs).includes(gap)) return; // gap used
    if (!selectedJob) return; // no job selected

    const correctGap = quizData
      .find((q) => q.id === 4) // question #2 is matching
      .data.pairs.find((p) => p.job === selectedJob)?.correct;

    if (correctGap === gap) {
      // correct match
      setMatchedJobs((prev) => ({ ...prev, [selectedJob]: gap }));
      const color = colorMap[selectedJob] || "green";
      setJobColors((prev) => ({ ...prev, [selectedJob]: color }));
      setGapColors((prev) => ({ ...prev, [gap]: color }));
    } else {
      // flash red
      setFlashRed((prev) => ({ ...prev, [selectedJob]: true, [gap]: true }));
      setTimeout(() => {
        setFlashRed((prev) => ({
          ...prev,
          [selectedJob]: false,
          [gap]: false,
        }));
      }, 1000);
    }
    setSelectedJob(null);
  };

  // ----------------------------------------------------------------
  // -------------- RENDER THE QUESTION INTERACTION -----------------
  // ----------------------------------------------------------------
  const renderInteraction = (question, index) => {
    // Special slider for question #1
    if (question.id === 2 && question.question_type === "slider_year") {
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
            disabled={showAnswer[question.id]}
          />
          <span className="slider-value">
            {answers[question.id] || question.data.min}
          </span>
          <div className="slider-hint">
            <div className="key-item">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/500px-Flag_of_France.svg.png"
                alt="France Flag"
                className="flag-image"
              />
              <span>France introduced their equal pay act in 1972</span>
            </div>
            <div className="key-item">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/383px-Flag_of_the_United_States_%28Pantone%29.svg.png"
                alt="US Flag"
                className="flag-image"
              />
              <span>US introduced their equal pay act in 1963</span>
            </div>
          </div>
        </div>
      );
    }

    // Other question types
    switch (question.question_type) {
      case "slider_year":
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
              disabled={showAnswer[question.id]}
            />
            <span className="slider-value">
              {answers[question.id] || question.data.min}
            </span>
          </div>
        );

      case "slider_pence":
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
              disabled={showAnswer[question.id]}
            />
            <span className="slider-value">
              {answers[question.id] || question.data.min}p
            </span>
          </div>
        );

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
              disabled={showAnswer[question.id]}
            />
            <span className="slider-value">
              {answers[question.id] || question.data.min}%
            </span>
          </div>
        );

      case "matching":
        const jobList = question.data.pairs.map((p) => p.job);
        const gapList = question.data.options;
        return (
          <>
            <p className="matching-info">
              In the context of the gender pay gap, a higher positive percentage
              (+) indicates women are paid less than men, while a negative
              percentage (–) indicates men are paid less than women.
            </p>
            <div className="click-match-container">
              <div className="click-match-col">
                <h4>Jobs</h4>
                {jobList.map((job) => {
                  const alreadyMatched = matchedJobs[job];
                  const flashingRed = flashRed[job];
                  const bgColor = jobColors[job] || "";
                  return (
                    <div
                      key={job}
                      className={`match-card ${alreadyMatched ? "dim" : ""} ${
                        flashingRed ? "flash-red" : ""
                      }`}
                      style={{ backgroundColor: bgColor }}
                      onClick={() => {
                        if (!showAnswer[question.id]) handleJobClick(job);
                      }}
                    >
                      {job}
                    </div>
                  );
                })}
              </div>
              <div className="click-match-col">
                <h4>Pay Gaps</h4>
                {gapList.map((gap) => {
                  const alreadyUsed = Object.values(matchedJobs).includes(gap);
                  const flashingRed = flashRed[gap];
                  const bgColor = gapColors[gap] || "";
                  return (
                    <div
                      key={gap}
                      className={`match-card ${alreadyUsed ? "dim" : ""} ${
                        flashingRed ? "flash-red" : ""
                      }`}
                      style={{ backgroundColor: bgColor }}
                      onClick={() => {
                        if (!showAnswer[question.id]) handleGapClick(gap);
                      }}
                    >
                      {gap}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );

      case "ranking":
        return (
          <div
            className="ranking-container"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div className="ranking-label">Smallest</div>
            <ul className="ranking-list">
              {rankingOrder.map((item, idx) => (
                <li
                  key={idx}
                  className="ranking-item"
                  onPointerDown={(e) => handlePointerDown(e, idx)}
                  style={{
                    touchAction: "none",
                    userSelect: "none",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="ranking-label">Largest</div>
          </div>
        );

      default:
        return null;
    }
  };

  // ----------------------------------------------------------------
  // -------------------- RENDER ANSWER FEEDBACK ---------------------
  // ----------------------------------------------------------------
  const renderAnswerFeedback = (question) => {
    // If the *most recent* question we scored was incorrect => highlight
    // (If you want per-question correctness stored individually, you can do so.)
    const feedbackClass = !currentIsCorrect ? "incorrect-feedback" : "";

    switch (question.question_type) {
      case "slider_year":
      case "slider_pence":
      case "slider_percent":
        return (
          <div className={`answer-feedback ${feedbackClass}`}>
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

      case "matching":
        return (
          <div className={`answer-feedback ${feedbackClass}`}>
            <p>Correct Answers:</p>
            <ul>
              {question.data.pairs.map((pair, idx) => {
                const userGap = matchedJobs[pair.job] || "No match";
                const isCorrect = userGap === pair.correct;
                return (
                  <li key={idx}>
                    {pair.job}: Your Match: {userGap} | Correct: {pair.correct}{" "}
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

      case "ranking":
        return (
          <div className={`answer-feedback ${feedbackClass}`}>
            <p>Your Order: {answers[question.id]?.join(" > ")}</p>
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

      default:
        return null;
    }
  };

  // ----------------------------------------------------------------
  // --------------------- MAIN RENDER -------------------------------
  // ----------------------------------------------------------------
  return (
    <div className="wrapper">
      {/* The top “intro” bubble (always shown). Make it smaller with the new class */}
      <div className="lorem-container" style={{ marginBottom: "1rem" }}>
        <h2>Header</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
          condimentum iaculis cursus. Aliquam sed eros in felis efficitur
          lacinia at eget lacus. Pellentesque habitant morbi tristique senectus
          et netus et malesuada fames ac turpis egestas. Aenean eu tristique
          libero, lacinia mattis dolor. Nunc et dictum lacus. Etiam efficitur ex
          a mauris semper convallis. Donec rhoncus pretium dui nec iaculis.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Praesent feugiat, leo sit amet malesuada
          iaculis, tellus turpis sagittis elit, et efficitur magna justo non
          lacus. Nullam a elit placerat, sagittis elit ut, volutpat dolor.
          Integer quis.
        </p>
      </div>

      {/* Loop over all questions. Show question i ONLY if i < visibleUpTo. */}
      {quizData.map((question, i) => {
        if (i >= visibleUpTo) {
          // This question not yet revealed
          return null;
        }
        return (
          <React.Fragment key={question.id}>
            {/* Question bubble */}
            <div className="quiz-container quiz-container-smaller">
              <h2>Question {i + 1}</h2>
              <p className="question-prompt">{question.data.prompt}</p>

              <div className="interaction-area">
                {renderInteraction(question, i)}
              </div>

              {!showAnswer[question.id] ? (
                <div className="button-group">
                  <button
                    className="action-btn"
                    onClick={() => handleShowAnswer(question.id, i)}
                  >
                    Show Answer
                  </button>
                </div>
              ) : (
                renderAnswerFeedback(question)
              )}

              {/* Reference link if any */}
              <div className="reference-container">
                {references[question.id] && (
                  <p>
                    {" "}
                    {references[question.id].startsWith("http") ? (
                      <a
                        href={references[question.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Reference
                      </a>
                    ) : (
                      references[question.id]
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* The “between” lorem bubble that goes with question i (unless it's the last question) */}
            {i < quizData.length - 1 && (
              <div className="lorem-container">
                <h2>Between Question Lorem Box</h2>
                <p>{questionLorems[i] || "Lorem ipsum placeholder text..."}</p>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* After the last question is revealed, if the user has “stepped past” it, show scoreboard */}
      {visibleUpTo > quizData.length && (
        <div className="lorem-container">
          <h2>Your Final Score</h2>
          <p className="score-display">
            Score: {score} / {quizData.length}
          </p>
        </div>
      )}

      <footer></footer>
    </div>
  );
}

export default Quiz;
