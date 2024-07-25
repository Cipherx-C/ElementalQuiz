import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserForm from './components/UserForm';
import Question from './components/Question';
import Results from './components/Results';
import { UserProvider } from './components/UserContext';

const questions = [
  {
    question: "Qual é a sua cor favorita?",
    options: ["Vermelho 🔴", "Azul 🔵", "Verde 🟢", "Amarelo 🟡"],
  },
];

const keywords = {
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};

const elements = {
  "Vermelho 🔴": "Fire",
  "Azul 🔵": "Water",
  "Verde 🟢": "Earth",
  "Amarelo 🟡": "Air",
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);
  const [userName, setUserName] = useState("");

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(answer => {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  }

  async function fetchArtwork(keyword) {
    try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`);
      const data = await response.json();
      if (data.objectIDs && data.objectIDs.length > 0) {
        const objectId = data.objectIDs[0];
        const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
        const objectData = await objectResponse.json();
        setArtwork(objectData);
      }
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex, answers]);

  return (
    <UserProvider>
      <Router>
        <div className="app-container"> 
          <Header />
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route 
              path="/quiz"
              element={
                currentQuestionIndex < questions.length ? (
                  <Question 
                    question={questions[currentQuestionIndex].question} 
                    options={questions[currentQuestionIndex].options} 
                    onAnswer={handleAnswer} 
                  />
                ) : (
                  <Results element={element} artwork={artwork} />
                )
              }
            />
          </Routes>
        </div> 
      </Router>
    </UserProvider>
  );
}

export default App;
