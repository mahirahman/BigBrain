import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Register () {
  const navigate = useNavigate();
  return (
    <>
      <h1>Register</h1>
      <RegisterForm
        submit={(name, email, password) => {
          fetch('http://localhost:5005/admin/auth/register', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              name,
              email,
              password
            })
          });
          navigate('/quizzes');
        }}
      />
    </>
  );
}

export default Register;
