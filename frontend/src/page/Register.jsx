import React from 'react';
import RegisterForm from '../component/RegisterForm';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../css/LoginRegisterForm.module.css';

export function Register () {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${style.form_container} ${style.center}`}>
        <h1 className={style.form_main_title}>Register your Account</h1>
        <RegisterForm
          success={() => {
            navigate('/quizzes');
          }}
        />
        <div className="card">
          {' '}
          Already Registered?{' '}
          <a
            onClick={() => {
              navigate('/login');
            }}
            className="link pointer"
          >
            Login in
          </a>
        </div>
      </div>
    </>
  );
}

export default Register;
