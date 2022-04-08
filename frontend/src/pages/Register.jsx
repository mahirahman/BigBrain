import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../component/RegisterForm';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Register () {
  const navigate = useNavigate();
  return (
    <>
      <div className="center">
        <h1>Register your Account</h1>
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
            Login In
          </a>
        </div>
      </div>
    </>
  );
}

export default Register;
