import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export function Login () {
  const navigate = useNavigate();
  return (
    <>
      <h1>Login</h1>
        <LoginForm success={() => {
          navigate('/quizzes');
        }}/>
    </>
  );
}

export default Login;
