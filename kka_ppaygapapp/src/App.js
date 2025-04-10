import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './Quiz.js';
import About from './About.js';
import './style.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header-container">
          <div className="app-header">
            <h1>Gender Pay Gap Quiz</h1>
          </div>
          <nav className="app-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/About">About</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
