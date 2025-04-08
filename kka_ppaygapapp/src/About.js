import React from 'react';
import './style.css';

// Adjust these paths if your folder structure is different
import KKA from './DigInvImg/KKA.png';
import Kendra from './DigInvImg/Kendra.png';
import Kim from './DigInvImg/Kim.png';
import Alice from './DigInvImg/Alice.png';

function About() {
  return (
    <div className="about-page-container">

 
      <h2>About Us Section</h2>

      <div className="about-banner">
        <img src={KKA} alt="KKA Logo or Banner" />
      </div>

   
      <div className="about-description">
        <p>
          Welcome to our web page! Our goal is to shed light on the gender pay gap
          through an engaging and interactive platform.
        </p>
        <p>
          Together, we’re combining our skills to create a space where you can learn
          about the gender pay gap through an interactive quiz, real stories, and
          factual analysis. We believe that understanding this issue is the first step
          towards creating change, and we’re here to make that journey as engaging and
          enlightening as possible.
        </p>
      </div>

     
      <div className="about-team">
        <div className="team-member">
          <img src={Kendra} alt="Kendra" />
          <h3>Kendra</h3>
          <p>
          Kendra is the creative force behind our website. She’s responsible for
          designing and coding the interactive quiz and webpage that you see. Kendra
          ensures that the experience is smooth and visually appealing, integrating
          data, stories, and interactive elements in a way that makes exploring the
          gender pay gap both insightful and engaging.
          </p>
        </div>

        <div className="team-member">
          <img src={Kim} alt="Kim" />
          <h3>Kim</h3>
          <p>
          Kim is our storyteller and interviewer. She’s the voice behind the real-life
          stories featured on our webpage. Kim goes out to interview people, gather
          opinions, and uncover unique perspectives on the gender pay gap. Through
          thoughtful conversations and in-depth interviews, the human side of the issue
          is presented, making sure that the voices of those affected are heard and
          understood.
          </p>
        </div>

        <div className="team-member">
          <img src={Alice} alt="Alice" />
          <h3>Alice</h3>
          <p>
          Alice is our fact-checker and content writer. She carefully verifies every
          statistic and fact presented, ensuring that our quizzes and stories are
          accurate and credible. Alice creates clear and informative content related to
          the gender pay gap, combining data with real-world insights. Her role of
          paying attention to detail helps build trust in the information presented.
          </p>
        </div>
      </div>
    </div>
  
  );
  
}

export default About;
