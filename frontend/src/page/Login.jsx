import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../component/LoginForm';
import { Card } from 'react-bootstrap';
import style from '../css/LoginRegisterForm.module.css';

export function Login () {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${style.form_container} ${style.center}`}>
        <h1 className={style.form_main_title}>Sign in to your account</h1>
        <LoginForm success={() => {
          navigate('/quizzes');
        }}/>
        <Card className={style.card}> New user? <a onClick={() => { navigate('/register') }} className={style.pointer}>Create an account</a></Card>
      </div>
    </>
  );
}

export default Login;
