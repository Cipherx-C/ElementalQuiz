import React from 'react';
import { Link } from 'react-router-dom';
import "./css/header.css"

export default function Header() {
  return (
    <header>
      <h1>Personalidade Quiz</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </nav>
    </header>
  );
}
