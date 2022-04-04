import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login () {
  const navigate = useNavigate();
  return (
    <>
      <h1>Sign in to your account</h1>
        <LoginForm success={() => {
          navigate('/quizzes');
        }}/>
        <div className="card"> New user? <a onClick={() => { navigate('/register') }} className="link pointer">Create an account</a></div>
    </>
  );
}

export default Login;
