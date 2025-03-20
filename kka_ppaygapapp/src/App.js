import React from 'react';
import Quiz from './Quiz.js';
import './style.css';

function App() {
  return (
    <div className="App">
      <header className="header-container">
        <div className="app-header">
          <h1>Gender Pay Gap Quiz</h1>
        </div>
        <nav className="app-nav">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact-us</li>
          </ul>
        </nav>
      </header>
      <Quiz />
    </div>
  );
}

export default App;
