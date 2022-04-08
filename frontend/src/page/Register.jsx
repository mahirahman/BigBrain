import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../component/RegisterForm';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../css/LoginRegisterForm.module.css';

export function Register () {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${style.form_container} ${style.center}`}>
        <h1 className={style.form_main_title}>Register your Account</h1>
        <RegisterForm success={() => {
          navigate('/quizzes');
        }}/>
        <Card className={style.card}> Already Registered? <a onClick={() => { navigate('/login') }} className={style.pointer}>Login to your account</a></Card>
      </div>
    </>
  );
}

export default Register;
