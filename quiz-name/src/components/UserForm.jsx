import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import "./css/userForm.css"

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);
    navigate('/quiz');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Qual é o seu nome?
        <input 
          type="text" 
          value={inputName} 
          onChange={(e) => setInputName(e.target.value)} 
          required 
        />
      </label>
      <button type="submit">Iniciar Quiz</button>
    </form>
  );
}
