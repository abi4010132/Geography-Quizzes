import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FlagQuiz from './components/FlagQuiz'
import ShapeQuiz from './components/ShapeQuiz'


function HomePage() {
  return (
    <div className="home">
      <h1>Guess the Country 🌍</h1>
      <p>Test your geographical knowledge</p>

      <div className="quiz-links">
        <Link to="/flags" className="quiz-card">
          Guess the Flag
        </Link>
        <Link to="/shapes" className="quiz-card">
          Guess the Shape
        </Link>
      </div>
    </div>
  );
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flags" element={<FlagQuiz />} />
        <Route path="/shapes" element={<ShapeQuiz />} />
        <Route path="*" element={<h1>Welcome! Choose a quiz.</h1>} />
      </Routes>
    </Router>
  )
}

export default App
