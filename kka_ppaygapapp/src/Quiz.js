import React, { useState } from "react";
import "./style.css";
import genImage from "./DigInvImg/home.png";
import equalImage from "./DigInvImg/Equal.png";
import motherImage from "./DigInvImg/mother.png";
import graphImg from "./DigInvImg/graph.png";

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
      prompt: "When did the UK introduce the Equal Pay Act?",
      min: 1960,
      max: 1990,
      correct_answer: 1970,
    },
  },
  {
    id: 4,
    question_type: "matching",
    data: {
      prompt: "Match these companies to their gender pay gap:",
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
        "The average percentage pay difference between women and men is 13.1% What is the average percentage pay difference between mothers and fathers? ",
      min: 0,
      max: 30,
      correct_answer: 24,
    },
  },
];

const references = {
  2: "https://www.legislation.gov.uk/ukpga/1970/41/enacted",
  4: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024",
  1: "https://www.ciphr.com/infographics/gender-pay-gap-statistics-2024",
  5: "https://www.theguardian.com/world/2024/mar/08/uk-mothers-earned-444-less-an-hour-than-fathers-in-2023-finds-analysis",
};

const questionLorems = [
  "The gender pay gap increases over time, widening gradually but significantly from your late 20s and early 30s. Men’s wages tend to continue growing rapidly at this point (particularly for the highly educated), while women's wages plateau.\n\nOn average, every month working women take home £631 less than men – that’s £7,572 over the course of a year. This means that on average women ‘stop earning’ in early November every year.\n\nAccording to the anti-sexism group Young Women’s Trust, most of the income gap occurs because women are paid less even when working in similar jobs and sectors.",
  "The Equal Pay Act was introduced in the UK in 1970. It enshrined the right to equal pay for equal work between men and women and significantly reduced institutional barriers to pay equality. Equal pay is a related but different concept to the gender pay gap. The 1970 Act allowed women to bring claims not only when their employer pays them less than men for doing the same work, but also when they are in a job that is equally demanding in terms of effort, skill or responsibility.\n\n%%EQUAL_IMG%%\n\nIt forms a crucial part of the legislative history of progress towards equal pay.\n\n1944: The Education Act said a woman could not be fired from her teaching job if she got married.\n\n1968: A group of 187 female sewing machinists at the Ford Motor Company’s Dagenham factory went on strike for equal pay. Their work stitching car seat covers was classified as unskilled and so they were paid 15% less than their male counterparts. They secured a pay rise but not the same pay as their male colleagues.\n\n1975: It was by Barbara Castle that the Sex Discrimination Act as well as the Equal Pay Act were introduced in 1975, around the same time that the Equal Opportunities Commission (EOC) was established to tackle the issue of sex discrimination, helping future cases with Employment Tribunals and the courts.\n\nDirection of legislative action today\n\nThe gender pay gap remains. PwC estimates that based on the rate of progress between 2011 and 2023 it will take 29 years to close the gender pay gap in the UK.",
  "The UK government requires all employers with 250 or more employees to disclose their gender pay gap every year.\n\n%%GRAPH_IMG%%\n\nThere is a clear difference between private and public companies in the data they report. In the private sector, men’s median salary is 5.2% higher than women’s, while in the public sector it is 14.35% higher.\n\nDespite eight years of mandatory reporting, there has been only limited progress in closing the gender pay gap. Priya Sahni-Nicholas from the campaign group Equality Trust said that 'evidence has shown that mandatory pay gap reporting in and of itself has not proved to be effective in reducing the gaps.'\n\nThe Equality Trust is calling for more funding and stronger powers for the Equality and Human Rights Commission. It wants companies to be required to publish clear action plans to reduce gendered pay disparity and face consequences if they fail to do so.\n\nThe group also warned that the gender pay gap has increased at times, even among companies that already report, suggesting that reporting alone has not produced the meaningful change needed.",
  'Cara (not her real name) had to give up a big project when she became pregnant. The XX-year-old architectural designer feels this could damage her career. "I was always aware of the gender pay gap, but being pregnant made it personal," she said.\n\n%%MOTHER_IMG%%\n\nThe "motherhood penalty" is the impact of the disadvantages women face in the workplace when they become mothers. The long hours spent at work are viewed by employers as a sign of commitment and reliability. But taking maternity leave can impact one\'s career if your employer sees you as less available.\n\nSome jobs in the UK offer maternity leave benefits but other sources of income such as bonuses may still be affected. "I have to consider how being off the project might impact my eligibility for project-based bonuses," said Cara.\n\nOne study showed that, on average, mothers earned only three quarters of what fathers made.\n\nAnother analysis, by the Institute for Fiscal Studies, found that most of the gender pay gaps are caused by parenthood. It said women\'s earnings decrease significantly when they become parents. Men don\'t.\n\nCara believes there can be a perception that you\'re less committed because you choose to focus on your family over your career.\n\n"That perception can influence how you progress in your career, which I think men typically don\'t face in the same way," she said.',
  "Lorem #5: Aliquam suscipit mauris libero, sed hendrerit ipsum auctor.",
];

const betweenTitles = [
  "How does the Gender Pay Gap affect you?",
  "Legislation regarding the Gender Pay Gap.",
  "The Pay Gap Reports",
  "The motherhood penalty",
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

  // Indicate correctness of the most recently scored question
  const [correctnessMap, setCorrectnessMap] = useState({});

  const [visibleUpTo, setVisibleUpTo] = useState(1);

  // ------------------ MATCHING QUESTION HOOKS ----------------------
  const [selectedJob, setSelectedJob] = useState(null);
  const [matchedJobs, setMatchedJobs] = useState({});
  const [jobColors, setJobColors] = useState({});
  const [gapColors, setGapColors] = useState({});

  const colorMap = {
    Next: "#FFC1CC",
    HSBC: "#C2E7FF",
    NHS: "#FFF9C4",
    Lidl: "#D7BCE8",
  };

  // ------------------- “SHOW ANSWER” BUTTON ------------------------
  const handleShowAnswer = (questionId, questionIndex) => {
    // Reveal the answer for this question
    setShowAnswer((prev) => ({ ...prev, [questionId]: true }));

    // Score it if not already done
    if (!scored[questionId]) {
      const question = quizData[questionIndex];
      let isCorrect = false;

      if (
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
        // ─── NEW: recolour each pair green (correct) or red (incorrect) ───
        const newJobColours = {};
        const newGapColours = {};
        question.data.pairs.forEach(({ job, correct }) => {
          const user = matchedJobs[job] || null;
          if (user === correct) {
            newJobColours[job] = "green";
            newGapColours[correct] = "green";
          } else {
            newJobColours[job] = "red";
            if (user) newGapColours[user] = "red";
          }
        });
        setJobColors((prev) => ({ ...prev, ...newJobColours }));
        setGapColors((prev) => ({ ...prev, ...newGapColours }));
      }

      // Update overall score if correct
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setScored((prev) => ({ ...prev, [questionId]: true }));
      setCorrectnessMap((prev) => ({ ...prev, [questionId]: isCorrect }));
    }

    // After revealing answer for question i, show the next question i+1:
    // i.e. visibleUpTo = i+2
    setVisibleUpTo(questionIndex + 2);
  };

  // --------------------- MATCHING LOGIC ----------------------------
  const handleJobClick = (job) => {
    if (matchedJobs[job]) return;
    setSelectedJob(job);
  };

  const handleGapClick = (gap) => {
    if (!selectedJob) {
      // if no job chosen yet, ignore or flash
      return;
    }
    if (Object.values(matchedJobs).includes(gap)) return;

    // now match them visually:
    const color =
      Object.values(jobColors).length % 4 === 0
        ? colorMap.Next
        : Object.values(jobColors).length === 1
        ? colorMap.HSBC
        : Object.values(jobColors).length === 2
        ? colorMap.NHS
        : colorMap.Lidl;

    setMatchedJobs((prev) => ({ ...prev, [selectedJob]: gap }));
    setJobColors((prev) => ({ ...prev, [selectedJob]: color }));
    setGapColors((prev) => ({ ...prev, [gap]: color }));

    // reset selections
    setSelectedJob(null);
  };

  // -------------- RENDER THE QUESTION INTERACTION -----------------
  const renderInteraction = (question, index) => {
    // Special slider for question #2 (slider_year)
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
              <span>France introduced an equal pay act in 1972</span>
            </div>
            <div className="key-item">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/383px-Flag_of_the_United_States_%28Pantone%29.svg.png"
                alt="US Flag"
                className="flag-image"
              />
              <span>The US introduced an equal pay act in 1963</span>
            </div>
          </div>
        </div>
      );
    }

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
              A positive percentage (+) indicates men are paid more than women,
              while a negative percentage (–) indicates men are paid less than
              women.
            </p>
            <p className="matching-info">
              Click on a Company and then Click on a pay gap percentage to match
              them.
            </p>
            <div className="click-match-container">
              <div className="click-match-col">
                <h4>Companies</h4>
                {jobList.map((job) => {
                  const alreadyMatched = matchedJobs[job];

                  const bgColor = jobColors[job] || "";
                  return (
                    <div
                      key={job}
                      className={`match-card ${alreadyMatched ? "dim" : ""}`}
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
                  const bgColor = gapColors[gap] || "";
                  return (
                    <div
                      key={gap}
                      className={`match-card ${alreadyUsed ? "dim" : ""}`}
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

      default:
        return null;
    }
  };

  // -------------------- RENDER ANSWER FEEDBACK ---------------------
  const renderAnswerFeedback = (question) => {
    const isCorrect = correctnessMap[question.id];
    const feedbackClass = !isCorrect ? "incorrect-feedback" : "";
    switch (question.question_type) {
      case "slider_year":
      case "slider_pence":
      case "slider_percent":
        if (isCorrect) {
          return (
            <div className={`answer-feedback ${feedbackClass}`}>
              <p>
                <span className="correct-badge">Correct Answer</span>
              </p>
            </div>
          );
        } else {
          return (
            <div className={`answer-feedback ${feedbackClass}`}>
              <p>
                correct answer: {question.data.correct_answer}
                {question.question_type === "slider_percent"
                  ? "%"
                  : question.question_type === "slider_pence"
                  ? "p"
                  : ""}
              </p>
              <p>
                <span className="incorrect-badge">Incorrect</span>
              </p>
            </div>
          );
        }

      case "matching":
        if (correctnessMap[question.id]) {
          return (
            <div className={`answer-feedback ${feedbackClass}`}>
              <p>
                <span className="correct-badge">Correct answer</span>
              </p>
            </div>
          );
        } else {
          return (
            <div className={`answer-feedback ${feedbackClass}`}>
              <p>correct answers: </p>
              <ul>
                {question.data.pairs.map((pair, idx) => {
                  const userGap = matchedJobs[pair.job] || "No match";
                  const isPairCorrect = userGap === pair.correct;
                  return (
                    <li key={idx}>
                      {pair.job}: You chose {userGap}. Correct is {pair.correct}
                      .
                      {isPairCorrect ? (
                        <span className="correct-badge"> ✓</span>
                      ) : (
                        <span className="incorrect-badge"> ✗</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

      default:
        return null;
    }
  };

  // --------------------- MAIN RENDER -------------------------------
  return (
    <div className="wrapper">
      <div className="hero-image-container">
        <img src={genImage} alt="Pay Gap Banner" className="hero-image" />
      </div>
      {/* The top “intro” bubble (always shown). Make it smaller with the new class */}
      <div className="lorem-container" style={{ marginBottom: "1rem" }}>
        <h2>
          After 8 years of obligatory gender pay gap reporting by UK businesses,
          three-quarters of included companies pay men more than women. AC, KT
          and KE explain what creates the gap.
        </h2>
        <p>
          The gender pay gap measures the difference in average pay between men
          and women. This can be affected by people’s age, the job they do, or
          where they live.
        </p>
        <p>
          One explanation for women’s lower pay is preference. Women after all
          are free to choose their own educational and career paths and so the
          disparity could be explained by women’s tendency to, for example,
          choose careers that tend to pay less.
        </p>
        <p>
          We can see for example that lower-paying sectors such as childcare and
          education are overwhelmingly female. But this doesn’t explain most of
          the difference in what men and women are paid.
        </p>
      </div>

      {/* Loop over all questions. Show question i ONLY if i < visibleUpTo. */}
      {quizData.map((question, i) => {
        if (i >= visibleUpTo) {
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

            {/* The “between” lorem bubble that goes with question i (render for every question) */}
            {/* The “between” lorem bubble that goes with question i */}
            {i < quizData.length && (
              <div
                className={`between-wrapper ${
                  showAnswer[question.id] ? "" : "blurred"
                }`}
              >
                <div className="lorem-container">
                  <h2>{betweenTitles[i]}</h2>
                  {(() => {
                    const text =
                      questionLorems[i] || "Lorem ipsum placeholder text...";

                    if (text.includes("%%EQUAL_IMG%%")) {
                      const parts = text.split("%%EQUAL_IMG%%");
                      return (
                        <>
                          <p>{parts[0]}</p>
                          <div className="hero-image-container">
                            <img
                              src={equalImage}
                              alt="Equal Pay Act"
                              className="hero-image"
                            />
                          </div>
                          <p>{parts[1]}</p>
                        </>
                      );
                    }

                    if (text.includes("%%MOTHER_IMG%%")) {
                      const parts = text.split("%%MOTHER_IMG%%");
                      return (
                        <>
                          <p>{parts[0]}</p>
                          <div className="hero-image-container">
                            <img
                              src={motherImage}
                              alt="Pregnant woman illustration"
                              className="hero-image"
                            />
                          </div>
                          <p>{parts[1]}</p>
                        </>
                      );
                    }
                    if (text.includes("%%GRAPH_IMG%%")) {
                      const parts = text.split("%%GRAPH_IMG%%");
                      return parts.map((part, idx) => (
                        <React.Fragment key={idx}>
                          <p>{part}</p>
                          {idx === 0 && (
                            <div className="hero-image-container">
                              <img
                                src={graphImg}
                                alt="Graph showing companies paying men more"
                                className="hero-image"
                              />
                            </div>
                          )}
                        </React.Fragment>
                      ));
                    }

                    return <p>{text}</p>;
                  })()}
                </div>

                {/* overlay */}
                {!showAnswer[question.id] && (
                  <div className="learn-overlay">
                    <p>To learn more, answer the question above first.</p>
                  </div>
                )}
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

      <footer>
        <p>The images on this page were made with the use of generative AI</p>
      </footer>
    </div>
  );
}

export default Quiz;
