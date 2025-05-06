import React, { useState } from "react";
import "./style.css";
import womenImage from "./DigInvImg/women.png";

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
        "The average percentage pay difference between women and men is 13.1%% What is the average percentage pay difference between mothers and fathers? ",
      min: 0,
      max: 30,
      correct_answer: 24,
    },
  },
];

const references = {
  4: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024",
  1: "https://www.ciphr.com/infographics/gender-pay-gap-statistics-2024",
  5: "https://www.theguardian.com/world/2024/mar/08/uk-mothers-earned-444-less-an-hour-than-fathers-in-2023-finds-analysis",
};

const questionLorems = [
  "Crucially, the gender pay gap increases over time; widening gradually but significantly from an individual’s late 20s and early 30s. Men’s wages tend to continue growing rapidly at this point in the life cycle (particularly for the highly educated), while women's wages plateau.\n\nOn average, every month working women take home £631 less than men - that’s £7,572 over the course of a year. This means that on average women ‘stop earning’ on November 20th every year – from which date they effectively work for free compared to their male counterparts.\n\nAccording to the Young Women’s Trust, about one fifth of the gender pay gap can be accounted for by differing jobs and sectors. By contrast, around two thirds of the income gap occurs because women are paid less even when working in similar jobs and sectors and having similar characteristics.",
  "The Equal Pay Act was introduced in the UK in 1970, based on the 1963 Act of the same name in the United States. It enshrined the right to equal pay for equal work between men and women and significantly reduced the institutional barriers to pay equality.\n\nCrucial, equal pay is a related but unidentical concept to the Gender Pay Gap.\n\nThis allowed individuals to bring claims not only when their employer pays them less than men for doing the same or similar work, but also when they are in a role that is equally demanding in terms of effort, skill or responsibility.\n\nIt forms a crucial part of the legislative history of progress towards equal pay.\n\n1944: The Education Act was introduced reading that no women were to be removed from employment as a teacher by reasons of marriage. It took 27 years for the marriage bar to fully take effect as married women were not allowed to work as teachers until in 1919 the ‘Sex Disqualification Removal Act’ was introduced.\n\n1968: A group of around 187 female sewing machinists at the Ford Motor Company’s Dagenham factory striked for equal pay. Their work stitching car seat covers was classified as “unskilled” and they were consequently paid 15% less than their male counterparts. The Labour Employment Minister Barbara Castle intervened on their behalf to negotiate a settlement.\n\n%%WOMEN_IMG%%\n\n1970: Castle introduced the Equal Pay Bill into the House of Commons. However, it was another nine years until 1984 when the sewing machinists at Ford would receive equal pay and earn the same grade as their male colleagues.\n\n1975: It was by Barbara Castle that the Sex Discrimination Act as well as the Equal Pay Act were introduced in 1975, around the same time that the Equal Opportunities Commission (EOC) was established to tackle the issue of sex discrimination, helping future cases with Employment Tribunals and the courts.\n\nDirection of legislative action today\n\nDespite previous legislation, the Gender Pay Gap remains. According to PwC, based on the rate of progress between 2011 and 2023 it would take 29 years to close the gender pay gap in the UK. There is thus pressure on the political parties to take action to close the gap. However, different parties display different levels of commitment.",
  "Since 2017, the UK government has required all employers with 250 or more employees to disclose their gender pay gap on an annual basis.\n\nThere's a stark difference between the median hourly percent at private and public companies included in the compulsory reporting figures. Private: 5.2, public: 14.3\n\nHowever, despite eight years of compulsory reporting, the gender pay gap has only shown narrow improvements year on year. Co-Executive Director Priya from the campaign group Equality Trust points out that “evidence has shown that mandatory pay gap reporting in and of itself has not proved to be effective in reducing the gaps.”\n\n“Both of those gaps [CEO and gender pay] have been increasing, even among companies who report so reporting hasn't brought about the change we'd want to see.”\n\nThe Equality Trust now campaigns “for mandatory action plans and for the regulators - in this case the EHRC, to have more resource and powers to enforce compliance and deal with non-compliance.”",
  "Cara (not her real name)...\n\n(Interviewee did not want to be named)\n\n“I was always aware of the gender pay gap, but being pregnant made it personal.” says an associate architectural designer. Becoming a parent is something she has always wanted; however, she has always worked hard for her career - earning a degree in architectural designing and landing a job at an international company in the design and consulting industry. The architect is about to give birth to her first newborn and had to give up a big project, harming her career progression in the architectural industry.\n\nThe “motherhood penalty” is the impact of the disadvantages women face in the workplace when they become mothers. The long hours spent at work are viewed by employers as a sign of commitment and reliability. But taking maternity leave can impact one’s career by “being seen as less reliable.”\n\nA study was released highlighting the impact of the “motherhood penalty” by comparing the hourly earnings between mothers and fathers. It showed that mothers earn on average 24% less per hour than fathers, which is £4.44 per hour.\n\nSome jobs in the UK offer maternity leave benefits but may affect other sources of income such as bonuses. “I have to consider how being off the project might impact my eligibility for project-based bonuses,” said the associate designer.\n\nAn analysis by the Institute for Fiscal Studies (IFS) found that most of the gender pay gaps are caused by parenthood. It found that while the average earnings of men are not affected by parenthood, women’s earnings decrease significantly when they become parents.\n\nThere’s a perception in certain workplaces where you’re seen as less committed because you choose to focus on your family over your career. The associate architectural designer said, “That perception can influence how you progress in your career, which I think men typically don’t face in the same way.”\n\nThe associate designer expresses her concerns for a major project that she was leading before she got pregnant. Architecture is project-driven and requires long hours and consistent involvement - and when there is time taken off it feels as though “your career is put on hold.” Those who take maternity leave often return to find they’ve been passed over for key projects or leadership roles, which, although not intentional, happens because the ongoing project must carry on. “Once you’re back it’s like reestablishing your place within the team and we have to compensate.”\n\nThe architect designer says that changes are needed to see a pay and career progression for women. Some of these changes would be to have more transparency in how bonuses and pay rises are calculated after maternity leave or to create ways to accommodate career breaks without penalising women. These sorts of changes can help make a difference.",
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
  const [currentIsCorrect, setCurrentIsCorrect] = useState(null);

  const [visibleUpTo, setVisibleUpTo] = useState(1);

  // ------------------ MATCHING QUESTION HOOKS ----------------------
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

  // --------------------- MATCHING LOGIC ----------------------------
  const handleJobClick = (job) => {
    if (matchedJobs[job]) return; // already matched
    setSelectedJob(job);
  };

  const handleGapClick = (gap) => {
    if (Object.values(matchedJobs).includes(gap)) return; // gap used
    if (!selectedJob) return; // no job selected

    const correctGap = quizData
      .find((q) => q.id === 4)
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

      default:
        return null;
    }
  };

  // -------------------- RENDER ANSWER FEEDBACK ---------------------
  const renderAnswerFeedback = (question) => {
    const feedbackClass = !currentIsCorrect ? "incorrect-feedback" : "";
    switch (question.question_type) {
      case "slider_year":
      case "slider_pence":
      case "slider_percent":
        if (currentIsCorrect) {
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
        if (currentIsCorrect) {
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
                  const isCorrect = userGap === pair.correct;
                  return (
                    <li key={idx}>
                      {pair.job}: Your Match: {userGap} | Correct:{" "}
                      {pair.correct}{" "}
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
        }

      default:
        return null;
    }
  };

  // --------------------- MAIN RENDER -------------------------------
  return (
    <div className="wrapper">
      {/* The top “intro” bubble (always shown). Make it smaller with the new class */}
      <div className="lorem-container" style={{ marginBottom: "1rem" }}>
        <h2>The Gender Pay Gap</h2>
        <p>
          The gender pay gap measures the difference in average pay between men
          and women. The level of disparity is impacted by factors including
          occupation, age and region.
        </p>
        <p>
          One explanation forwarded for women’s lower pay is the matter of
          preference. Women after all are free to choose their own educational
          and career paths and therefore the disparity could be explained by a
          tendency to, for example, choose lower-paying careers.
        </p>
        <p>
          This explanation has some capital, we can see for example that
          lower-paying sectors such as childcare and education are
          overwhelmingly female. But this only paints a partial picture;
          crucially ignoring the existence of a gender pay gap within
          occupations. Even when men and women work the same hours in the
          same roles, nearly two-thirds of the gender pay gap remains
          unexplained.
        </p>
        <p>
          This issue therefore requires a deeper
          look at the societal and economic forces which underpin it.
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
            {i < quizData.length && (
              <div className="lorem-container">
                <h2>{betweenTitles[i]}</h2>
                {(() => {
                  const text =
                    questionLorems[i] || "Lorem ipsum placeholder text...";
                  if (text.includes("%%WOMEN_IMG%%")) {
                    const parts = text.split("%%WOMEN_IMG%%");
                    return parts.map((part, idx) => (
                      <React.Fragment key={idx}>
                        <p>{part}</p>
                        {idx < parts.length - 1 && (
                          <div style={{ textAlign: "center" }}>
                            <img
                              src={womenImage}
                              alt="Women"
                              style={{ maxWidth: "100%", margin: "1rem auto" }}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    ));
                  }
                  return <p>{text}</p>;
                })()}
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
