import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { Quizzes } from './pages/Quizzes';
import { Error } from './pages/Error';

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default Path */}
          <Route path='/' element={<Login />} />
          {/* 404 Page Not Found */}
          <Route path='/*' element={<Error />} />
          {/* Login Page */}
          <Route path='/login' element={<Login />} />
          {/* Quizzes Page */}
          <Route path='/quizzes' element={<Quizzes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
