import React from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { loginAPI } from './api.js';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export const loginUser = async (email, password) => {
  const data = await loginAPI(email, password)
  console.log(data);
  localStorage.setItem('authToken', data.token);
  console.log(localStorage.getItem('authToken'));
};

function App () {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to='/login'>Login</Link>
        </nav>
        <Routes>
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
