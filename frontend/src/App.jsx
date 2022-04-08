import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './page/Login';
import { Register } from './page/Register';
import { Quizzes } from './page/Quizzes';
import { Error } from './page/Error';

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default Path */}
          <Route path="/" element={<Login/>} />
          {/* 404 Page Not Found */}
          <Route path="/*" element={<Error/>} />
          {/* Login Page */}
          <Route path="/login" element={<Login/>} />
          {/* Register Page */}
          <Route path="/register" element={<Register/>} />
          {/* Quizzes Page */}
          <Route path="/quizzes" element={<Quizzes/>} />
        </Routes>
      </BrowserRouter>
      <svg className="wave_background_img" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,192L80,208C160,224,320,256,480,245.3C640,235,800,181,960,165.3C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}

export default App;
