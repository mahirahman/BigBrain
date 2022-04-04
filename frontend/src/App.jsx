import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { Quizzes } from './pages/Quizzes';

function App () {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to='/login'>Login</Link>
        </nav>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/quizzes' element={<Quizzes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
